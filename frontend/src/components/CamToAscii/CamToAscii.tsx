import React, { useState, useMemo, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import {
	CameraIcon,
	StopCircleIcon,
	SaveIcon,
	RotateCwIcon,
} from "lucide-react";
import { useAscii } from "@/contexts/AsciiArtContext";

import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import {
	ASCII_CHAR_MAP,
	AsciiStyle,
	DEFAULT_FRAMERATE,
	DEFAULT_DETAIL_LEVEL,
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	FIXED_BOX_HEIGHT_PX,
	FONT_SIZE_CHAR_WIDTH_RATIO,
	FONT_SIZE_PX_TO_REM_FACTOR,
	FLASH_DURATION_MS,
} from "./constants";
import { AsciiSettings, AsciiSavePayload } from "./types";

import { useWebcam } from "@/hooks/useWebcam";
import { useAsciiProcessor } from "@/hooks/useAsciiProcessor";

interface CamToAsciiProps {
	initialFrameRate?: number;
	initialDetailLevel?: number;
}

const CamToAscii: React.FC<CamToAsciiProps> = ({
	initialFrameRate = DEFAULT_FRAMERATE,
	initialDetailLevel = DEFAULT_DETAIL_LEVEL,
}) => {
	// --- Local UI State (Managed by this component) ---
	const [title, setTitle] = useState<string>("");
	const [frameRate, setFrameRate] = useState<number>(initialFrameRate);
	const [detailLevel, setDetailLevel] = useState<number>(initialDetailLevel);
	const [selectedAsciiStyleKey, setSelectedAsciiStyleKey] =
		useState<AsciiStyle>("default");
	const [backgroundColor, setBackgroundColor] = useState<"black" | "white">(
		"black"
	);

	// --- Context ---
	const { saveAsciiToServer } = useAscii();

	// --- Webcam Hook ---
	const {
		videoRef,
		isStreamActive,
		isVideoLoaded,
		error: webcamError,
		startStream,
		stopStream,
	} = useWebcam({ canvasWidth: CANVAS_WIDTH, canvasHeight: CANVAS_HEIGHT });

	// --- ASCII Processor Hook Settings ---
	//useMemo ensures this object is stable unless its dependencies change
	const asciiSettings = useMemo(
		(): AsciiSettings => ({
			frameRate,
			detailLevel,
			asciiChars: ASCII_CHAR_MAP[selectedAsciiStyleKey],
			canvasWidth: CANVAS_WIDTH,
			canvasHeight: CANVAS_HEIGHT,
		}),
		[frameRate, detailLevel, selectedAsciiStyleKey]
	);

	// --- ASCII Processor Hook ---
	//this hook manages the ASCII conversion, photos, countdown, etc.
	const {
		canvasRef,
		asciiOutput, // Live feed
		photoTakenAscii, // Captured photo
		countdown, // Countdown timer value
		isFlashing, // Flash effect state
		processingError, // Errors from ASCII processing/capture
		asciiGridWidth, // Calculated grid width
		asciiGridHeight, // Calculated grid height
		triggerPhotoBooth, // Function to start countdown/photo
		retakePhoto, // Function to clear photo/countdown and return to live view
	} = useAsciiProcessor({
		videoRef: videoRef as React.RefObject<HTMLVideoElement>, // Pass video element ref
		isStreamActive, // Pass stream status
		isVideoLoaded, // Pass video loaded status
		settings: asciiSettings, // Pass ASCII generation settings
	});

	// --- Derived Values for Rendering ---
	const fixedBoxAspectRatio = useMemo(() => CANVAS_WIDTH / CANVAS_HEIGHT, []);
	const fixedBoxWidth = useMemo(
		() => FIXED_BOX_HEIGHT_PX * fixedBoxAspectRatio,
		[fixedBoxAspectRatio] // Dependency: fixedBoxAspectRatio is stable
	);

	// Calculate font size based on grid dimensions and fixed box size
	const fontSizePx = useMemo(() => {
		// Prevent division by zero if grid dimensions are somehow 0
		if (asciiGridHeight === 0 || asciiGridWidth === 0) return 10; // Default fallback size
		return Math.max(
			1, // Ensure font size is at least 1px
			Math.min(
				FIXED_BOX_HEIGHT_PX / asciiGridHeight, // Fit vertically
				fixedBoxWidth / asciiGridWidth / FONT_SIZE_CHAR_WIDTH_RATIO // Fit horizontally
			)
		);
	}, [asciiGridHeight, asciiGridWidth, fixedBoxWidth]);

	const fontSizeRem = useMemo(
		() => fontSizePx * FONT_SIZE_PX_TO_REM_FACTOR,
		[fontSizePx]
	);

	// Combine errors from both hooks for display
	const errorMessage = webcamError || processingError;

	// --- Event Handlers ---
	const handleStartWebcam = useCallback(async () => {
		// Reset relevant state before starting
		retakePhoto(); // Clear any existing photo/countdown/processing errors
		setTitle(""); // Clear title field
		await startStream(); // Attempt to start the webcam stream
		// Note: Errors from startStream are captured in webcamError state
	}, [startStream, retakePhoto]); // Dependencies: Functions from hooks

	// Corrected: Only call functions exposed by hooks
	const handleStopWebcam = useCallback(() => {
		stopStream(); // Stop the camera stream (from useWebcam)
		retakePhoto(); // Reset ASCII state (photo, countdown) (from useAsciiProcessor)
		// The useAsciiProcessor hook should internally stop the animation loop
		// when isStreamActive becomes false.
	}, [stopStream, retakePhoto]); // Dependencies: Functions from hooks

	const handleSaveAscii = useCallback(async (): Promise<void> => {
		if (!photoTakenAscii) {
			toast.error("No photo has been taken to save.");
			return;
		}
		const trimmedTitle = title.trim();
		if (!trimmedTitle) {
			toast.error("Please enter a title before saving.");
			return;
		}

		try {
			const payload: AsciiSavePayload = {
				title: trimmedTitle,
				content: photoTakenAscii,
			};
			// Assume saveAsciiToServer returns boolean or throws error
			const success = await saveAsciiToServer(payload);

			if (success) {
				toast.success("ASCII art saved successfully!");
				retakePhoto(); // Go back to live view
				setTitle(""); // Clear the title input
			} else {
				// If saveAsciiToServer returns false without throwing
				toast.error("Failed to save ASCII art. Server reported an issue.");
			}
		} catch (err) {
			console.error("Error saving ASCII art:", err);
			const message = err instanceof Error ? err.message : "Unknown error";
			toast.error(`Failed to save ASCII art: ${message}`);
			// Optionally, set a local error state or display in the card
		}
	}, [photoTakenAscii, title, saveAsciiToServer, retakePhoto]); // Dependencies

	// --- Render Logic Variables ---
	const displayAscii = photoTakenAscii || asciiOutput; // Show photo if available, else live feed
	const showAscii = (isStreamActive || photoTakenAscii) && !!displayAscii; // Determine if *any* ASCII should be rendered
	const isSaveDisabled = !photoTakenAscii || !title.trim(); // Can save only if photo taken and title exists
	const isTitleInputDisabled = !isStreamActive && !photoTakenAscii; // Disable if camera totally off
	const isTakePhotoDisabled =
		!isStreamActive ||
		!isVideoLoaded ||
		countdown !== null ||
		!!photoTakenAscii; // Disable photo button if stream not ready, counting down, or photo already taken
	const isFrameRateSliderDisabled = !!photoTakenAscii; // Disable framerate change when viewing static photo

	// --- Render ---
	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">ASCII Canvas</CardTitle>
				<CardDescription>
					Capture your live camera feed as ASCII art.
				</CardDescription>
			</CardHeader>

			{/* Display Combined Error Message */}
			{errorMessage && (
				<CardContent className="pt-0 pb-2 text-red-600">
					Error: {errorMessage}
				</CardContent>
			)}

			<CardContent className="space-y-6">
				{/* Title Input */}
				<div className="space-y-2">
					<Label htmlFor="title" className="text-sm font-medium">
						Title (required to save):
					</Label>
					<Input
						type="text"
						id="title"
						placeholder="Enter title for your art"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						maxLength={100}
						disabled={isTitleInputDisabled}
					/>
				</div>

				{/* ASCII Display Area */}
				<div
					className={`relative flex items-center justify-center overflow-hidden rounded-md border border-input ${
						backgroundColor === "white" ? "bg-white" : "bg-black"
					}`}
					style={{
						height: `${FIXED_BOX_HEIGHT_PX}px`,
						width: `${fixedBoxWidth}px`,
						margin: "0 auto", // Center the box
					}}>
					{/* Flash Effect Overlay */}
					{isFlashing && (
						<div
							className="absolute inset-0 bg-white opacity-80 animate-fade-out z-20"
							style={{ animationDuration: `${FLASH_DURATION_MS}ms` }}
							key="flash" // Key helps React reset animation if needed
						/>
					)}

					{/* ASCII Content */}
					{showAscii && (
						<pre
							aria-live="polite" // Announce changes for screen readers if needed
							className={`leading-none font-mono p-1 whitespace-pre ${
								backgroundColor === "white" ? "text-black" : "text-white"
							}`}
							style={{
								fontSize: `${fontSizeRem}rem`,
								overflow: "hidden", // Should fit due to calculations
								maxWidth: "100%",
								maxHeight: "100%",
							}}>
							{displayAscii}
						</pre>
					)}

					{/* Countdown Overlay */}
					{countdown !== null && (
						<div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10">
							<span
								className="text-white text-8xl font-bold drop-shadow-lg"
								aria-live="assertive">
								{countdown}
							</span>
						</div>
					)}

					{/* Placeholder when inactive */}
					{!isStreamActive && !photoTakenAscii && countdown === null && (
						<div className="flex flex-col items-center justify-center h-full text-muted-foreground">
							<CameraIcon className="h-16 w-16 mb-4" aria-hidden="true" />
							<p>Camera Inactive</p>
						</div>
					)}
				</div>

				{/* Controls Area */}
				<div className="space-y-4 pt-4">
					{/* ASCII Style Selector */}
					<div className="space-y-2">
						<Label htmlFor="asciiStyle">ASCII Style</Label>
						<Select
							value={selectedAsciiStyleKey}
							onValueChange={
								(value) => setSelectedAsciiStyleKey(value as AsciiStyle) // Type assertion
							}>
							<SelectTrigger id="asciiStyle">
								<SelectValue placeholder="Select style" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Styles</SelectLabel>
									{/* Dynamically generate options from ASCII_CHAR_MAP */}
									{Object.entries(ASCII_CHAR_MAP).map(([key, _value]) => (
										<SelectItem key={key} value={key}>
											{/* Simple transformation for display name */}
											{key.charAt(0).toUpperCase() +
												key.slice(1).replace(/_/g, " ")}
											{/* Replace all underscores */}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{/* Background Color Toggler */}
					<div className="space-y-2">
						<Label className="text-sm font-medium block mb-1">
							Background Color
						</Label>{" "}
						{/* Added block/mb for better spacing */}
						<div className="flex gap-2">
							<Button
								variant={backgroundColor === "black" ? "default" : "outline"}
								onClick={() => setBackgroundColor("black")}
								aria-pressed={backgroundColor === "black"} // Accessibility
							>
								Black
							</Button>
							<Button
								variant={backgroundColor === "white" ? "default" : "outline"}
								onClick={() => setBackgroundColor("white")}
								aria-pressed={backgroundColor === "white"} // Accessibility
							>
								White
							</Button>
						</div>
					</div>

					{/* Detail Slider */}
					<div className="space-y-2">
						<div className="flex justify-between text-sm font-medium">
							<Label htmlFor="detailSlider">Detail Level</Label>
							{/* Show grid only if dimensions are valid */}
							{asciiGridWidth > 0 && asciiGridHeight > 0 && (
								<span>
									({asciiGridWidth}x{asciiGridHeight})
								</span>
							)}
						</div>
						<Slider
							id="detailSlider"
							value={[detailLevel]}
							min={1}
							max={20}
							step={1}
							onValueChange={(vals) => setDetailLevel(vals[0])}
							aria-label="Detail Level"
						/>
					</div>

					{/* Frame Rate Slider */}
					<div className="space-y-2">
						<Label
							htmlFor="frameRateSlider"
							className="text-sm font-medium flex justify-between">
							<span>Frame Rate</span>
							<span>{frameRate} fps</span>
						</Label>
						<Slider
							id="frameRateSlider"
							value={[frameRate]}
							min={1}
							max={30}
							step={1}
							onValueChange={(vals) => setFrameRate(vals[0])}
							disabled={isFrameRateSliderDisabled}
							aria-label="Frame Rate"
						/>
					</div>
				</div>
			</CardContent>

			{/* Footer Buttons - Conditional Rendering Logic */}
			<CardFooter className="flex flex-wrap justify-center gap-4">
				{/* Show Start Button only if stream is NOT active */}
				{!isStreamActive && (
					<Button
						onClick={handleStartWebcam}
						className="flex items-center gap-2">
						<CameraIcon className="h-4 w-4" /> Start Camera
					</Button>
				)}

				{/* Show Take Photo/Stop Buttons if stream IS active AND NO photo is taken */}
				{isStreamActive && !photoTakenAscii && (
					<>
						<Button
							onClick={triggerPhotoBooth}
							disabled={isTakePhotoDisabled}
							className="flex items-center gap-2">
							<CameraIcon className="h-4 w-4" /> Take Photo{" "}
							{countdown !== null ? `(${countdown})` : ""}
						</Button>
						<Button
							onClick={handleStopWebcam}
							variant="destructive"
							className="flex items-center gap-2">
							<StopCircleIcon className="h-4 w-4" /> Stop Camera
						</Button>
					</>
				)}

				{/* Show Retake/Save/Stop Buttons if stream IS active AND a photo IS taken */}
				{isStreamActive && photoTakenAscii && (
					<>
						<Button onClick={retakePhoto} className="flex items-center gap-2">
							<RotateCwIcon className="h-4 w-4" /> Retake
						</Button>
						<Button
							onClick={handleSaveAscii}
							variant="outline"
							disabled={isSaveDisabled}
							className="flex items-center gap-2">
							<SaveIcon className="h-4 w-4" /> Save
						</Button>
						<Button
							onClick={handleStopWebcam}
							variant="destructive"
							className="flex items-center gap-2">
							<StopCircleIcon className="h-4 w-4" /> Stop Camera
						</Button>
					</>
				)}
			</CardFooter>

			{/* Hidden Video and Canvas Elements */}
			<video
				ref={videoRef}
				autoPlay
				playsInline // Important for mobile browsers
				muted // Often required for autoplay
				className="hidden" // Visually hide
				width={CANVAS_WIDTH} // Set dimensions for consistency
				height={CANVAS_HEIGHT}
				aria-hidden="true" // Hide from screen readers
			/>
			<canvas
				ref={canvasRef}
				className="hidden" // Visually hide
				width={CANVAS_WIDTH} // Set dimensions for consistency
				height={CANVAS_HEIGHT}
				aria-hidden="true" // Hide from screen readers
			/>
		</Card>
	);
};

export default CamToAscii;
