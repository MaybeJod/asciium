import React, { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { CameraIcon, StopCircleIcon, SaveIcon } from "lucide-react";

import { useAscii } from "@/contexts/AsciiArtContext";
import { toast } from "sonner";

interface WebcamToAsciiProps {
	initialWidth?: number;
	initialHeight?: number;
	initialFrameRate?: number;
}

const CamToAscii: React.FC<WebcamToAsciiProps> = ({
	initialWidth = 120,
	initialHeight = 80,
	initialFrameRate = 15,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [asciiOutput, setAsciiOutput] = useState<string>("");
	const [isCapturing, setIsCapturing] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(initialWidth);
	const [height, setHeight] = useState<number>(initialHeight);
	const [frameRate, setFrameRate] = useState<number>(initialFrameRate);
	const [contrast, setContrast] = useState<number>(128);
	const [brightness, setBrightness] = useState<number>(0);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

	// ASCII character set from dark to light
	const asciiChars = " .,:;i1tfLCG08@";
	const animationFrameIdRef = useRef<number | null>(null);
	// const frameCounterRef = useRef<number>(0);
	const lastTimeRef = useRef<number>(0);

	const { saveAsciiToServer } = useAscii();

	useEffect(() => {
		return () => {
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
			}
			stopMediaTracks();
		};
	}, []);

	useEffect(() => {
		if (isCapturing) {
			startCapturing();
		}
	}, [isCapturing, frameRate]);

	const stopMediaTracks = (): void => {
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			const tracks = stream.getTracks();
			tracks.forEach((track) => track.stop());
			videoRef.current.srcObject = null;
		}
		setVideoLoaded(false);
	};

	const startWebcam = async (): Promise<void> => {
		setErrorMessage("");
		console.log("Starting webcam...");

		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error("Browser doesn't support getUserMedia API");
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false,
			});

			console.log("Got media stream:", stream);

			if (videoRef.current) {
				videoRef.current.srcObject = stream;

				videoRef.current.onloadedmetadata = async () => {
					console.log("Video metadata loaded");
					if (videoRef.current) {
						await videoRef.current.play();
						setIsCapturing(true);
						setVideoLoaded(true);
						startCapturing();
					}
				};

				videoRef.current.onerror = (event) => {
					console.error("Video error:", event);
					setErrorMessage("Video element encountered an error");
				};
			} else {
				console.error("Video reference is null");
				setErrorMessage("Could not access video element");
			}
		} catch (err) {
			console.error("Error accessing webcam:", err);
			if (err instanceof Error) {
				if (
					err.name === "NotAllowedError" ||
					err.name === "PermissionDeniedError"
				) {
					setErrorMessage(
						"Camera access was denied. Please grant permission to use your camera."
					);
				} else if (
					err.name === "NotFoundError" ||
					err.name === "DevicesNotFoundError"
				) {
					setErrorMessage(
						"No camera found. Please connect a camera and try again."
					);
				} else if (
					err.name === "NotReadableError" ||
					err.name === "TrackStartError"
				) {
					setErrorMessage("Camera is already in use by another application.");
				} else if (err.name === "OverconstrainedError") {
					setErrorMessage("Camera cannot provide the requested resolution.");
				} else {
					setErrorMessage(`Error accessing camera: ${err.message}`);
				}
			} else {
				setErrorMessage("An unknown error occurred accessing the camera.");
			}
		}
	};

	const stopWebcam = (): void => {
		console.log("Stopping webcam...");
		if (animationFrameIdRef.current) {
			cancelAnimationFrame(animationFrameIdRef.current);
			animationFrameIdRef.current = null;
		}
		stopMediaTracks();
		setIsCapturing(false);
		setAsciiOutput("");
	};

	const captureFrame = (timestamp: number) => {
		if (!videoRef.current || !canvasRef.current || !isCapturing) return;

		if (!lastTimeRef.current) {
			lastTimeRef.current = timestamp;
		}

		const elapsed = timestamp - lastTimeRef.current;
		const frameInterval = 1000 / frameRate;

		if (elapsed > frameInterval) {
			lastTimeRef.current = timestamp - (elapsed % frameInterval);

			const context = canvasRef.current.getContext("2d");
			if (!context) return;

			canvasRef.current.width = width;
			canvasRef.current.height = height;

			context.filter = `contrast(${contrast}%) brightness(${
				(brightness + 128) / 128
			})`;
			context.drawImage(videoRef.current, 0, 0, width, height);
			const imageData = context.getImageData(0, 0, width, height);
			const ascii = imageDataToAscii(imageData);
			setAsciiOutput(ascii);
		}

		animationFrameIdRef.current = requestAnimationFrame(captureFrame);
	};

	const startCapturing = () => {
		if (!isCapturing || !videoLoaded) return;
		if (animationFrameIdRef.current) {
			cancelAnimationFrame(animationFrameIdRef.current);
		}
		lastTimeRef.current = 0;
		animationFrameIdRef.current = requestAnimationFrame(captureFrame);
	};

	const imageDataToAscii = (imageData: ImageData): string => {
		const pixels = imageData.data;
		let ascii = "";

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const idx = (y * width + x) * 4;

				const r = pixels[idx];
				const g = pixels[idx + 1];
				const b = pixels[idx + 2];

				let gray = 0.299 * r + 0.587 * g + 0.114 * b;

				gray = Math.max(
					0,
					Math.min(255, (gray - 128) * (contrast / 128) + 128 + brightness)
				);

				const charIndex = Math.floor((gray * (asciiChars.length - 1)) / 255);
				ascii += asciiChars[charIndex];
			}
			ascii += "\n";
		}

		return ascii;
	};

	const handleSaveAsciiToServer = async (): Promise<void> => {
		if (!asciiOutput) {
			setErrorMessage("No ASCII art to save");

			return;
		}

		try {
			const response = await saveAsciiToServer(asciiOutput);

			if (response) {
				toast.success("ASCII art saved successfully!");
			} else {
				toast.error("Failed to save ASCII art: unknown error");
			}
		} catch (err) {
			console.error("Error saving ASCII art:", err);
			toast.error("Failed to save ASCII art: unknown error");

			setErrorMessage("Error connecting to server");
		}
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">Webcam to ASCII Converter</CardTitle>
				<CardDescription>
					Convert your webcam feed into real-time ASCII art
				</CardDescription>
			</CardHeader>

			{errorMessage && (
				<CardContent className="pt-0 pb-2">{errorMessage}</CardContent>
			)}

			<CardContent className="space-y-6">
				{/* Removed the original video feed and only show ASCII output */}
				<div className="min-h-64 bg-black rounded-md overflow-auto border border-gray-300 flex items-center justify-center">
					{isCapturing ? (
						<pre className="text-green-400 leading-[0.6] text-[0.5rem] md:text-xs font-mono p-3">
							{asciiOutput}
						</pre>
					) : (
						<div className="flex flex-col items-center justify-center h-full text-gray-400">
							<CameraIcon className="h-16 w-16 mb-4" />
							<p>Camera is inactive</p>
						</div>
					)}
				</div>

				{/* Debug info - can be removed in production */}
				<div className="text-xs text-gray-500 mt-2">
					<div>Camera Status: {isCapturing ? "Active" : "Inactive"}</div>
					<div>
						Video Stream: {videoRef.current?.srcObject ? "Set" : "Not Set"}
					</div>
					<div>Video Loaded: {videoLoaded ? "Yes" : "No"}</div>
				</div>

				<div className="space-y-4">
					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">Width: {width}px</label>
						</div>
						<Slider
							value={[width]}
							min={40}
							max={200}
							step={1}
							onValueChange={(vals) => setWidth(vals[0])}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">Height: {height}px</label>
						</div>
						<Slider
							value={[height]}
							min={30}
							max={150}
							step={1}
							onValueChange={(vals) => setHeight(vals[0])}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">
								Frame Rate: {frameRate} fps
							</label>
						</div>
						<Slider
							value={[frameRate]}
							min={1}
							max={30}
							step={1}
							onValueChange={(vals) => setFrameRate(vals[0])}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">
								Contrast: {contrast}
							</label>
						</div>
						<Slider
							value={[contrast]}
							min={1}
							max={255}
							step={1}
							onValueChange={(vals) => setContrast(vals[0])}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">
								Brightness: {brightness}
							</label>
						</div>
						<Slider
							value={[brightness + 128]}
							min={0}
							max={256}
							step={1}
							onValueChange={(vals) => setBrightness(vals[0] - 128)}
						/>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex justify-between">
				{!isCapturing ? (
					<Button onClick={startWebcam} className="flex items-center gap-2">
						<CameraIcon className="h-4 w-4" />
						Start Camera
					</Button>
				) : (
					<Button
						onClick={stopWebcam}
						variant="destructive"
						className="flex items-center gap-2">
						<StopCircleIcon className="h-4 w-4" />
						Stop Camera
					</Button>
				)}

				<Button
					onClick={handleSaveAsciiToServer}
					disabled={!asciiOutput}
					variant="outline"
					className="flex items-center gap-2">
					<SaveIcon className="h-4 w-4" />
					Save ASCII
				</Button>
			</CardFooter>

			{/* Hidden video and canvas elements for processing */}
			<video ref={videoRef} autoPlay playsInline muted className="hidden" />
			<canvas ref={canvasRef} className="hidden" />
		</Card>
	);
};

export default CamToAscii;
