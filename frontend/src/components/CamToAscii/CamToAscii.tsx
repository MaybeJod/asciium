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

import { Input } from "../ui/input";

import {
	CameraIcon,
	StopCircleIcon,
	SaveIcon,
	RotateCwIcon,
} from "lucide-react";

import { useAscii } from "@/contexts/AsciiArtContext";
import { toast } from "sonner";

interface WebcamToAsciiProps {
	initialFrameRate?: number;
}

const CamToAscii: React.FC<WebcamToAsciiProps> = ({
	initialFrameRate = 15,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [asciiOutput, setAsciiOutput] = useState<string>("");
	const [isCapturing, setIsCapturing] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [countdown, setCountdown] = useState<number | null>(null);
	const [isFlashing, setIsFlashing] = useState<boolean>(false);
	const [photoTaken, setPhotoTaken] = useState<string | null>(null);

	const [frameRate, setFrameRate] = useState<number>(initialFrameRate);
	const [contrast, setContrast] = useState<number>(128);
	const [brightness, setBrightness] = useState<number>(0);
	const [detailLevel, setDetailLevel] = useState<number>(10);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

	const canvasWidth = 1000;
	const canvasHeight = 1000;
	const fixedBoxHeight = 500; // Fixed height of the display box
	const fixedBoxAspectRatio = canvasWidth / canvasHeight;
	const fixedBoxWidth = fixedBoxHeight * fixedBoxAspectRatio;

	// Determine the number of ASCII characters based on detailLevel
	const asciiGridWidth = 16 * detailLevel; // Adjust base and multiplier as needed
	const asciiGridHeight = 12 * detailLevel;

	const asciiChars = " .,:;i1tfLCG08@";
	const animationFrameIdRef = useRef<number | null>(null);
	const lastTimeRef = useRef<number>(0);

	const { saveAsciiToServer } = useAscii();

	// Calculate font size to fit within the fixed box
	const fontSize = Math.min(
		fixedBoxHeight / asciiGridHeight,
		fixedBoxWidth / asciiGridWidth / 0.6 // Adjust character width ratio
	);
	const fontSizeRem = fontSize * 0.05; // Convert to rem (adjust factor as needed)

	useEffect(() => {
		return () => {
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
			}
			stopMediaTracks();
		};
	}, []);

	useEffect(() => {
		console.log(
			"Capture useEffect - isCapturing:",
			isCapturing,
			"photoTaken:",
			photoTaken
		);
		if (isCapturing && !photoTaken) {
			console.log("Capture useEffect - starting capture");
			startCapturing();
		} else {
			console.log(
				"Capture useEffect - stopping capture (isCapturing:",
				isCapturing,
				"photoTaken:",
				photoTaken,
				"animationFrameIdRef.current:",
				animationFrameIdRef.current
			);
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
			}
		}
	}, [isCapturing, frameRate, detailLevel, photoTaken]);

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
		console.log(
			"Starting webcam with canvas size:",
			canvasWidth,
			"x",
			canvasHeight
		);

		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error("Browser doesn't support getUserMedia API");
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: canvasWidth },
					height: { ideal: canvasHeight },
				}, // Request fixed canvas resolution
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
						setPhotoTaken(null); // Reset photo taken state
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
			// ... (rest of your webcam error handling)
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
					setErrorMessage(
						`Camera cannot provide the requested resolution (<span class="math-inline">\{canvasWidth\}x</span>{canvasHeight}).`
					);
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
		setCountdown(null); // Reset countdown
		setIsFlashing(false); // Reset flash
		setPhotoTaken(null); // Reset photo taken state
		setTitle(""); // Clear the title on stop
	};

	const triggerPhotoBooth = async () => {
		console.log(
			"triggerPhotoBooth triggered - isCapturing:",
			isCapturing,
			"countdown:",
			countdown,
			"photoTaken:",
			photoTaken
		);
		if (!isCapturing || countdown !== null || photoTaken) {
			console.log("triggerPhotoBooth aborted");
			return;
		}

		setCountdown(3);
		console.log("triggerPhotoBooth - countdown set to 3");

		const countdownInterval = setInterval(() => {
			setCountdown((prev) => {
				console.log("countdownInterval - previous:", prev);
				if (prev === 1) {
					clearInterval(countdownInterval);
					takePhoto();
					console.log(
						"countdownInterval - takePhoto called, countdown reset to null"
					);
					return null;
				} else if (prev !== null) {
					return prev - 1;
				}
				return null;
			});
		}, 1000);
	};

	const takePhoto = () => {
		if (!videoRef.current || !canvasRef.current) return;

		setIsFlashing(true);
		setTimeout(() => setIsFlashing(false), 300); // Simulate flash for 300ms

		const context = canvasRef.current.getContext("2d");
		if (!context) return;

		canvasRef.current.width = canvasWidth;
		canvasRef.current.height = canvasHeight;

		context.filter = `contrast(<span class="math-inline">\{contrast\}%\) brightness\(</span>{
      (brightness + 128) / 128
    })`;
		context.drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);
		const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
		const ascii = imageDataToAscii(imageData);
		setPhotoTaken(ascii); // Store the taken photo
		setAsciiOutput(""); // Clear the live feed
	};

	const captureFrame = (timestamp: number) => {
		console.log(
			"captureFrame - countdown:",
			countdown,
			"isCapturing:",
			isCapturing
		);
		if (!videoRef.current || !canvasRef.current || photoTaken) return; // Only stop capturing after photo is taken

		if (!lastTimeRef.current) {
			lastTimeRef.current = timestamp;
		}

		const elapsed = timestamp - lastTimeRef.current;
		const frameInterval = 1000 / frameRate;

		if (elapsed > frameInterval) {
			lastTimeRef.current = timestamp - (elapsed % frameInterval);

			const context = canvasRef.current.getContext("2d");
			if (!context) return;

			canvasRef.current.width = canvasWidth;
			canvasRef.current.height = canvasHeight;

			context.filter = `contrast(${contrast}%) brightness(${
				(brightness + 128) / 128
			})`;
			context.drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);
			const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
			const ascii = imageDataToAscii(imageData);
			setAsciiOutput(ascii); // Continue updating the ASCII output
		}

		animationFrameIdRef.current = requestAnimationFrame(captureFrame);
	};

	const startCapturing = () => {
		if (!isCapturing || !videoLoaded || photoTaken) return;
		if (animationFrameIdRef.current) {
			cancelAnimationFrame(animationFrameIdRef.current);
		}
		lastTimeRef.current = 0;
		animationFrameIdRef.current = requestAnimationFrame(captureFrame);
	};

	const imageDataToAscii = (imageData: ImageData): string => {
		const pixels = imageData.data;
		let ascii = "";

		const pixelSampleStepX = canvasWidth / asciiGridWidth;
		const pixelSampleStepY = canvasHeight / asciiGridHeight;

		for (let y = 0; y < asciiGridHeight; y++) {
			for (let x = 0; x < asciiGridWidth; x++) {
				const sampleX = Math.floor(x * pixelSampleStepX);
				const sampleY = Math.floor(y * pixelSampleStepY);

				const idx = (sampleY * canvasWidth + sampleX) * 4;

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
		if (!photoTaken) {
			toast.error("No photo taken to save.");
			return;
		}

		if (!title.trim()) {
			toast.error("Please enter a title for your ASCII art before saving.");
			return;
		}

		try {
			const response = await saveAsciiToServer({
				title: title,
				content: photoTaken,
			});

			if (response) {
				toast.success("ASCII art saved successfully!");
				setTitle(""); // Clear the title after saving
				setPhotoTaken(null); // Reset to live view
			} else {
				toast.error("Failed to save ASCII art: unknown error");
			}
		} catch (err) {
			console.error("Error saving ASCII art:", err);
			toast.error("Failed to save ASCII art: unknown error");
			setErrorMessage("Error connecting to server");
		}
	};

	const retakePhoto = () => {
		setPhotoTaken(null); // Clear the taken photo to go back to live view
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">Webcam ASCII Photo Booth</CardTitle>
				<CardDescription>
					Capture and save your ASCII art creations!
				</CardDescription>
			</CardHeader>

			{errorMessage && (
				<CardContent className="pt-0 pb-2">{errorMessage}</CardContent>
			)}

			<CardContent className="space-y-6">
				<div className="space-y-2">
					<label htmlFor="title" className="text-sm font-medium">
						Title:
					</label>
					<Input
						type="text"
						id="title"
						placeholder="Enter a title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div
					className="relative rounded-md border border-gray-300 flex items-center justify-center overflow-hidden"
					style={{
						height: `${fixedBoxHeight}px`,
						maxHeight: `${fixedBoxHeight}px`,
						backgroundColor: "black",
					}}>
					{isFlashing && (
						<div
							className="absolute top-0 left-0 w-full h-full bg-white opacity-80 animate-fade-out"
							style={{ animationDuration: "0.3s" }}
						/>
					)}
					{isCapturing && !photoTaken && (
						<pre
							className="text-green-400 leading-[0.6] font-mono p-3"
							style={{ whiteSpace: "pre-wrap", fontSize: `${fontSizeRem}rem` }}>
							{asciiOutput}
						</pre>
					)}
					{photoTaken && (
						<pre
							className="text-green-400 leading-[0.6] font-mono p-3"
							style={{ whiteSpace: "pre-wrap", fontSize: `${fontSizeRem}rem` }}>
							{photoTaken}
						</pre>
					)}
					{countdown !== null && (
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold z-10">
							{countdown}
						</div>
					)}
					{!isCapturing && !photoTaken && countdown === null && (
						<div className="flex flex-col items-center justify-center h-full text-gray-400">
							<CameraIcon className="h-16 w-16 mb-4" />
							<p>Camera is inactive</p>
						</div>
					)}
				</div>

				<div className="text-xs text-gray-500 mt-2">
					<div>Camera Status: {isCapturing ? "Active" : "Inactive"}</div>
					<div>
						Video Stream: {videoRef.current?.srcObject ? "Set" : "Not Set"}
					</div>
					<div>Video Loaded: {videoLoaded ? "Yes" : "No"}</div>
					<div>Detail Level: {detailLevel}</div>
					<div>
						ASCII Grid: {asciiGridWidth}x{asciiGridHeight}
					</div>
					<div>Font Size: {fontSizeRem.toFixed(2)}rem</div>
					{photoTaken && <div>Photo Taken!</div>}
				</div>

				<div className="space-y-4">
					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">
								Detail: Low ({asciiGridWidth}x{asciiGridHeight}) High
							</label>
						</div>
						<Slider
							value={[detailLevel]}
							min={1} // Adjust min and max for detail
							max={15}
							step={1}
							onValueChange={(vals) => setDetailLevel(vals[0])}
							disabled={photoTaken !== null} // Keep disabled after photo
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
							disabled={photoTaken !== null} // Keep disabled after photo
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
							disabled={photoTaken !== null} // Keep disabled after photo
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
							disabled={photoTaken !== null} // Keep disabled after photo
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
				) : photoTaken ? (
					<>
						<Button onClick={retakePhoto} className="flex items-center gap-2">
							<RotateCwIcon className="h-4 w-4" />
							Retake Photo
						</Button>
						<Button
							onClick={handleSaveAsciiToServer}
							variant="outline"
							className="flex items-center gap-2">
							<SaveIcon className="h-4 w-4" />
							Save Photo
						</Button>
						<Button
							onClick={stopWebcam}
							variant="destructive"
							className="flex items-center gap-2">
							<StopCircleIcon className="h-4 w-4" />
							Stop Camera
						</Button>
					</>
				) : (
					<>
						<Button
							onClick={stopWebcam}
							variant="destructive"
							className="flex items-center gap-2">
							<StopCircleIcon className="h-4 w-4" />
							Stop Camera
						</Button>
						<Button
							onClick={triggerPhotoBooth}
							className="flex items-center gap-2">
							<CameraIcon className="h-4 w-4" />
							Take Photo
						</Button>
					</>
				)}
			</CardFooter>

			<video ref={videoRef} autoPlay playsInline muted className="hidden" />
			<canvas ref={canvasRef} className="hidden" />
		</Card>
	);
};

export default CamToAscii;
