import { useState, useRef, useCallback, useEffect } from "react";

import { AsciiSettings } from "@/components/CamToAscii/types";
import {
	COUNTDOWN_SECONDS,
	FLASH_DURATION_MS,
	ASCII_GRID_BASE_WIDTH_FACTOR,
	ASCII_GRID_BASE_HEIGHT_FACTOR,
} from "@/components/CamToAscii/constants";

interface UseAsciiProcessorProps {
	videoRef: React.RefObject<HTMLVideoElement>;
	isStreamActive: boolean;
	isVideoLoaded: boolean;
	settings: AsciiSettings;
}

export function useAsciiProcessor({
	videoRef,
	isStreamActive,
	isVideoLoaded,
	settings,
}: UseAsciiProcessorProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationFrameIdRef = useRef<number | null>(null);
	const lastFrameTimeRef = useRef<number>(0);
	const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [asciiOutput, setAsciiOutput] = useState<string>("");
	const [photoTakenAscii, setPhotoTakenAscii] = useState<string | null>(null);
	const [countdown, setCountdown] = useState<number | null>(null);
	const [isFlashing, setIsFlashing] = useState<boolean>(false);
	const [processingError, setProcessingError] = useState<string>("");

	const { frameRate, detailLevel, asciiChars, canvasWidth, canvasHeight } =
		settings;

	//derived grid dimensions
	const asciiGridWidth = ASCII_GRID_BASE_WIDTH_FACTOR * detailLevel;
	const asciiGridHeight = ASCII_GRID_BASE_HEIGHT_FACTOR * detailLevel;

	const imageDataToAscii = useCallback(
		(imageData: ImageData): string => {
			const { data, width, height } = imageData;
			let ascii = "";
			const pixelSampleStepX = width / asciiGridWidth;
			const pixelSampleStepY = height / asciiGridHeight;

			for (let y = 0; y < asciiGridHeight; y++) {
				for (let x = 0; x < asciiGridWidth; x++) {
					const sampleX = Math.floor(x * pixelSampleStepX);
					const sampleY = Math.floor(y * pixelSampleStepY);
					const idx = (sampleY * width + sampleX) * 4;
					//basic bounds check (optional but safer)
					if (idx + 2 >= data.length) continue;
					const gray =
						0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
					const charIndex = Math.floor((gray * (asciiChars.length - 1)) / 255);
					//fallback to space
					ascii += asciiChars[charIndex] ?? " ";
				}
				ascii += "\n";
			}
			return ascii;
		},
		[asciiGridWidth, asciiGridHeight, asciiChars]
	);

	const captureSingleFrameAscii = useCallback((): string | null => {
		if (!videoRef.current || !canvasRef.current) {
			setProcessingError("Video or canvas element missing for capture.");
			return null;
		}
		const context = canvasRef.current.getContext("2d", {
			willReadFrequently: true,
		});
		if (!context) {
			setProcessingError("Failed to get 2D context for capture.");
			return null;
		}

		try {
			//ensure canvas matches desired internal resolution
			canvasRef.current.width = canvasWidth;
			canvasRef.current.height = canvasHeight;

			context.drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);
			const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
			return imageDataToAscii(imageData);
		} catch (error) {
			console.error("Error capturing single frame:", error);
			setProcessingError(
				`Error capturing frame: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
			return null;
		}
	}, [videoRef, canvasRef, canvasWidth, canvasHeight, imageDataToAscii]);

	const processFrameLoop = useCallback(
		(timestamp: number) => {
			if (
				!isStreamActive ||
				!isVideoLoaded ||
				photoTakenAscii ||
				!videoRef.current ||
				!canvasRef.current
			) {
				//ensure loop stops
				animationFrameIdRef.current = null;
				return;
			}

			if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
			const elapsed = timestamp - lastFrameTimeRef.current;
			const frameInterval = 1000 / frameRate;

			if (elapsed >= frameInterval) {
				lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);
				const ascii = captureSingleFrameAscii();
				if (ascii !== null) {
					setAsciiOutput(ascii);
					//clear previous errors on success
					setProcessingError("");
				}
			}

			animationFrameIdRef.current = requestAnimationFrame(processFrameLoop);
		},
		[
			isStreamActive,
			isVideoLoaded,
			photoTakenAscii,
			//add refs as dependencies
			videoRef,
			canvasRef,
			frameRate,
			//depends on imageDataToAscii -> settings
			captureSingleFrameAscii,
		]
	);

	//effect to manage the animation loop
	useEffect(() => {
		if (isStreamActive && isVideoLoaded && !photoTakenAscii) {
			//start loop
			if (!animationFrameIdRef.current) {
				//reset timing
				lastFrameTimeRef.current = 0;
				animationFrameIdRef.current = requestAnimationFrame(processFrameLoop);
			}
		} else {
			//stop loop
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
				animationFrameIdRef.current = null;
			}
		}

		//cleanup loop on unmount or when conditions change
		return () => {
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
				animationFrameIdRef.current = null;
			}
		};
	}, [isStreamActive, isVideoLoaded, photoTakenAscii, processFrameLoop]);

	const takePhotoNow = useCallback(() => {
		if (!isStreamActive || !isVideoLoaded) {
			setProcessingError("Camera not active or ready to take photo.");
			return;
		}
		const ascii = captureSingleFrameAscii();
		if (ascii !== null) {
			setPhotoTakenAscii(ascii);
			//clear live feed display
			setAsciiOutput("");

			//flash effect
			setIsFlashing(true);
			if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
			flashTimeoutRef.current = setTimeout(
				() => setIsFlashing(false),
				FLASH_DURATION_MS
			);
		}
	}, [isStreamActive, isVideoLoaded, captureSingleFrameAscii]);

	const triggerPhotoBooth = useCallback(() => {
		if (!isStreamActive || countdown !== null || photoTakenAscii) {
			//prevent multiple triggers
			return;
		}

		setCountdown(COUNTDOWN_SECONDS);
		if (countdownIntervalRef.current)
			//clear previous just in case
			clearInterval(countdownIntervalRef.current);

		countdownIntervalRef.current = setInterval(() => {
			setCountdown((prev) => {
				if (prev === null || prev <= 1) {
					clearInterval(countdownIntervalRef.current!);
					countdownIntervalRef.current = null;
					if (prev === 1) {
						//check if it was the last second
						takePhotoNow();
					}
					//reset countdown state
					return null;
				}
				return prev - 1;
			});
		}, 1000);
	}, [isStreamActive, countdown, photoTakenAscii, takePhotoNow]);

	const retakePhoto = useCallback(() => {
		setPhotoTakenAscii(null);
		//clear errors
		setProcessingError("");
		//ensure countdown is reset
		setCountdown(null);
		//the useEffect managing the loop will restart it automatically
	}, []);

	//cleanup timeouts/intervals on unmount
	useEffect(() => {
		return () => {
			if (countdownIntervalRef.current)
				clearInterval(countdownIntervalRef.current);
			if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
			if (animationFrameIdRef.current)
				cancelAnimationFrame(animationFrameIdRef.current);
		};
	}, []);

	return {
		canvasRef,
		asciiOutput,
		photoTakenAscii,
		countdown,
		isFlashing,
		processingError,
		//expose for display
		asciiGridWidth,
		//expose for display
		asciiGridHeight,
		triggerPhotoBooth,
		retakePhoto,
	};
}
