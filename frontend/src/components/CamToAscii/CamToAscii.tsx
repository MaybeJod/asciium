import React, { useEffect, useRef, useState, useCallback } from "react";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

// --- Constants ---
const ASCII_CHARS = {
	default: " .,:;i1tfLCG08@",
	shades_light: "        .:░▒▓█",
	shades_dark: "█▓▒░:.    ",
	symbols1: "#@80GCLft1i;:,. ",
	symbols2: "o O v V T L 7 U c C x X",
	complex1: "_______.:!/r(l1Z4H9W8$@",
	complex2: " .:-=+*#%@",
	complex3: "@%#*+=-:. ",
	extended: "Ñ@#W$9876543210?!abc;:+=-,._          ",
	minimal: ` ~ ! ^ ( ) - _ + = ; : ' " , . \\ / | < > [ ] { }`,
};

const DEFAULT_FRAMERATE = 15;
const DEFAULT_DETAIL_LEVEL = 4;
const CANVAS_WIDTH = 1000; // Fixed internal canvas resolution
const CANVAS_HEIGHT = 1000;
const FIXED_BOX_HEIGHT_PX = 500; // Fixed height of the display box in pixels
const FONT_SIZE_CHAR_WIDTH_RATIO = 0.6; // Approximate width/height ratio for monospace chars
const FONT_SIZE_PX_TO_REM_FACTOR = 0.0625; // 1rem = 16px, so 1px = 0.0625rem
const FLASH_DURATION_MS = 300;
const COUNTDOWN_SECONDS = 3;
const ASCII_GRID_BASE_WIDTH_FACTOR = 16; // Base multiplier for grid width based on detail
const ASCII_GRID_BASE_HEIGHT_FACTOR = 12; // Base multiplier for grid height based on detail

interface WebcamToAsciiProps {
	initialFrameRate?: number;
}

// --- Component ---
const CamToAscii: React.FC<WebcamToAsciiProps> = ({
	initialFrameRate = DEFAULT_FRAMERATE,
}) => {
	// --- Refs ---
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationFrameIdRef = useRef<number | null>(null);
	const lastFrameTimeRef = useRef<number>(0);

	// --- State ---
	const [isCapturing, setIsCapturing] = useState<boolean>(false); // Is the camera stream active?
	const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false); // Has the video metadata loaded?
	const [asciiOutput, setAsciiOutput] = useState<string>(""); // Live ASCII feed
	const [photoTakenAscii, setPhotoTakenAscii] = useState<string | null>(null); // Captured ASCII photo
	const [title, setTitle] = useState<string>("");
	const [countdown, setCountdown] = useState<number | null>(null); // Photo countdown timer
	const [isFlashing, setIsFlashing] = useState<boolean>(false); // Visual flash effect
	const [frameRate, setFrameRate] = useState<number>(initialFrameRate);
	const [detailLevel, setDetailLevel] = useState<number>(DEFAULT_DETAIL_LEVEL);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const [selectedAsciiStyle, setSelectedAsciiStyle] = useState<string>(
		ASCII_CHARS.default
	); // Default style
	const [backgroundColor, setBackgroundColor] = useState<"black" | "white">(
		"black"
	); // Default background

	// --- Context ---
	const { saveAsciiToServer } = useAscii();

	// --- Derived Values ---
	// Calculate ASCII grid dimensions based on detail level
	const asciiGridWidth = ASCII_GRID_BASE_WIDTH_FACTOR * detailLevel;
	const asciiGridHeight = ASCII_GRID_BASE_HEIGHT_FACTOR * detailLevel;

	// Calculate container dimensions and font size to fit the ASCII art
	const fixedBoxAspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
	const fixedBoxWidth = FIXED_BOX_HEIGHT_PX * fixedBoxAspectRatio;
	const fontSizePx = Math.min(
		FIXED_BOX_HEIGHT_PX / asciiGridHeight, // Fit vertically
		fixedBoxWidth / asciiGridWidth / FONT_SIZE_CHAR_WIDTH_RATIO // Fit horizontally (adjusting for char aspect ratio)
	);
	const fontSizeRem = fontSizePx * FONT_SIZE_PX_TO_REM_FACTOR; // Convert calculated px font size to rem for styling

	// --- Utility Functions ---
	const stopMediaTracks = useCallback((): void => {
		if (videoRef.current?.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach((track) => track.stop());
			videoRef.current.srcObject = null;
		}
		setIsVideoLoaded(false);
	}, []); // No dependencies, safe to memoize

	// --- Core Logic ---
	const imageDataToAscii = useCallback(
		(imageData: ImageData): string => {
			const { data, width, height } = imageData;
			let ascii = "";

			const currentAsciiChars = selectedAsciiStyle; // Use the state

			const pixelSampleStepX = width / asciiGridWidth;
			const pixelSampleStepY = height / asciiGridHeight;

			for (let y = 0; y < asciiGridHeight; y++) {
				for (let x = 0; x < asciiGridWidth; x++) {
					const sampleX = Math.floor(x * pixelSampleStepX);
					const sampleY = Math.floor(y * pixelSampleStepY);
					const idx = (sampleY * width + sampleX) * 4;
					const gray =
						0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
					const charIndex = Math.floor(
						(gray * (currentAsciiChars.length - 1)) / 255
					);
					ascii += currentAsciiChars[charIndex];
				}
				ascii += "\n";
			}
			return ascii;
		},
		[asciiGridWidth, asciiGridHeight, selectedAsciiStyle] // Add selectedAsciiStyle as a dependency
	);

	const captureFrame = useCallback(
		(timestamp: number) => {
			// Ensure prerequisites are met
			if (
				!isCapturing ||
				!isVideoLoaded ||
				photoTakenAscii || // Don't capture if a photo is already taken/displayed
				!videoRef.current ||
				!canvasRef.current
			) {
				animationFrameIdRef.current = null; // Ensure loop stops if conditions unmet
				return;
			}

			// Initialize first frame time
			if (!lastFrameTimeRef.current) {
				lastFrameTimeRef.current = timestamp;
			}

			const elapsed = timestamp - lastFrameTimeRef.current;
			const frameInterval = 1000 / frameRate;

			// Check if enough time has passed to render the next frame
			if (elapsed >= frameInterval) {
				lastFrameTimeRef.current = timestamp - (elapsed % frameInterval); // Adjust for smoother timing

				const context = canvasRef.current.getContext("2d", {
					willReadFrequently: true,
				}); // Hint for optimization
				if (!context) {
					console.error("Failed to get 2D context");
					animationFrameIdRef.current = null;
					return;
				}

				// Set canvas dimensions (clears canvas)
				canvasRef.current.width = CANVAS_WIDTH;
				canvasRef.current.height = CANVAS_HEIGHT;

				// Draw the current video frame onto the hidden canvas
				try {
					context.drawImage(
						videoRef.current,
						0,
						0,
						CANVAS_WIDTH,
						CANVAS_HEIGHT
					);
					// Get pixel data from the canvas
					const imageData = context.getImageData(
						0,
						0,
						CANVAS_WIDTH,
						CANVAS_HEIGHT
					);
					// Convert pixel data to ASCII string
					const ascii = imageDataToAscii(imageData);
					setAsciiOutput(ascii); // Update the live ASCII output state
				} catch (error) {
					console.error("Error drawing or getting image data:", error);
					// Optional: Set an error state or stop capture
				}
			}

			// Request the next frame
			animationFrameIdRef.current = requestAnimationFrame(captureFrame);
		},
		[isCapturing, isVideoLoaded, photoTakenAscii, frameRate, imageDataToAscii] // Dependencies for the capture loop logic
	);

	const startCapturing = useCallback(() => {
		if (!isCapturing || !isVideoLoaded || photoTakenAscii) return; // Don't start if not ready or photo taken

		// Clear any previous animation frame requests
		if (animationFrameIdRef.current) {
			cancelAnimationFrame(animationFrameIdRef.current);
		}
		lastFrameTimeRef.current = 0; // Reset frame timing
		animationFrameIdRef.current = requestAnimationFrame(captureFrame);
	}, [isCapturing, isVideoLoaded, photoTakenAscii, captureFrame]); // Dependencies to decide *when* to start the loop

	// --- Lifecycle Effect for Capture Loop ---
	useEffect(() => {
		// This effect manages starting/stopping the requestAnimationFrame loop
		if (isCapturing && isVideoLoaded && !photoTakenAscii) {
			startCapturing();
		} else {
			// Stop the loop if capturing stops, video unloads, or a photo is taken
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
				animationFrameIdRef.current = null;
			}
		}

		// Cleanup function: ensure the loop is stopped when the component unmounts
		// or when dependencies change in a way that stops capture.
		return () => {
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
				animationFrameIdRef.current = null;
			}
		};
	}, [isCapturing, isVideoLoaded, photoTakenAscii, startCapturing]); // Dependencies that control the loop state

	// --- Lifecycle Effect for Cleanup ---
	useEffect(() => {
		// This effect ensures media tracks are stopped when the component unmounts.
		return () => {
			stopMediaTracks();
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
			}
		};
	}, [stopMediaTracks]); // Run only on unmount (due to stable `stopMediaTracks`)

	// --- Event Handlers ---
	const startWebcam = async (): Promise<void> => {
		setErrorMessage("");
		setPhotoTakenAscii(null); // Ensure we start fresh
		setTitle(""); // Clear title when starting camera
		setIsCapturing(false); // Reset state before attempting start
		setIsVideoLoaded(false);

		if (!navigator.mediaDevices?.getUserMedia) {
			setErrorMessage("Webcam access not supported by this browser.");
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: CANVAS_WIDTH }, // Request desired resolution
					height: { ideal: CANVAS_HEIGHT },
					facingMode: "user", // Prefer front camera
				},
				audio: false,
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;

				// Use a promise to wait for metadata to load
				await new Promise<void>((resolve, reject) => {
					if (!videoRef.current) {
						reject(new Error("Video element became null"));
						return;
					}
					videoRef.current.onloadedmetadata = () => {
						setIsVideoLoaded(true); // Mark video as loaded
						resolve();
					};
					videoRef.current.onerror = (e) => {
						console.error("Video error:", e);
						reject(new Error("Video element encountered an error"));
					};
				});

				// Play the video (often requires user interaction, but might work after getUserMedia)
				await videoRef.current.play();
				setIsCapturing(true); // Start capturing state *after* successful play
				// The useEffect managing the capture loop will now start it.
			} else {
				throw new Error("Video element reference is not available.");
			}
		} catch (err) {
			console.error("Error accessing webcam:", err);
			stopMediaTracks(); // Clean up if error occurred
			let specificError = "An unknown error occurred accessing the camera.";
			if (err instanceof Error) {
				switch (err.name) {
					case "NotAllowedError":
					case "PermissionDeniedError":
						specificError =
							"Camera access denied. Please grant permission in your browser settings.";
						break;
					case "NotFoundError":
					case "DevicesNotFoundError":
						specificError =
							"No camera found. Please ensure a camera is connected and enabled.";
						break;
					case "NotReadableError":
					case "TrackStartError":
						specificError =
							"Camera is busy or cannot be accessed. It might be used by another application.";
						break;
					case "OverconstrainedError": // Often resolution issues
						specificError = `Camera doesn't support the requested resolution (${CANVAS_WIDTH}x${CANVAS_HEIGHT}). Try lower detail.`;
						break;
					default:
						specificError = `Error accessing camera: ${err.message}`;
				}
			}
			setErrorMessage(specificError);
		}
	};

	const stopWebcam = (): void => {
		// Order is important: stop tracks, then update state
		stopMediaTracks(); // Stops video stream and sets isVideoLoaded=false
		setIsCapturing(false); // Stops capture attempts
		// No need to explicitly cancel animation frame here, the useEffect will handle it
		setAsciiOutput(""); // Clear live feed
		setPhotoTakenAscii(null); // Clear photo
		setCountdown(null);
		setIsFlashing(false);
		setErrorMessage("");
		// Optionally clear title: setTitle("");
	};

	const takePhotoNow = useCallback(() => {
		if (!videoRef.current || !canvasRef.current || !isCapturing) return;

		// Flash effect
		setIsFlashing(true);
		setTimeout(() => setIsFlashing(false), FLASH_DURATION_MS);

		const context = canvasRef.current.getContext("2d", {
			willReadFrequently: true,
		});
		if (!context) return;

		// Ensure canvas is ready
		canvasRef.current.width = CANVAS_WIDTH;
		canvasRef.current.height = CANVAS_HEIGHT;

		// Draw current frame and convert
		try {
			context.drawImage(videoRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			const imageData = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			const ascii = imageDataToAscii(imageData);
			setPhotoTakenAscii(ascii); // Store the taken photo
			setAsciiOutput(""); // Clear the live feed display (optional)
			// The capture loop useEffect will stop the loop because photoTakenAscii is now set
		} catch (error) {
			console.error("Error taking photo:", error);
			setErrorMessage("Could not capture photo.");
			setPhotoTakenAscii(null); // Reset if error occurs
		}
	}, [isCapturing, imageDataToAscii]); // Dependencies needed for taking the photo

	const triggerPhotoBooth = useCallback(() => {
		if (!isCapturing || countdown !== null || photoTakenAscii) {
			return; // Don't start if not capturing, already counting, or photo taken
		}

		setCountdown(COUNTDOWN_SECONDS);

		const intervalId = setInterval(() => {
			setCountdown((prev) => {
				if (prev === null) {
					// Should not happen based on initial check, but safety first
					clearInterval(intervalId);
					return null;
				}
				if (prev === 1) {
					// Last second passed, take photo
					clearInterval(intervalId);
					takePhotoNow();
					return null; // Reset countdown state
				} else {
					// Decrement countdown
					return prev - 1;
				}
			});
		}, 1000);

		// Cleanup interval if component unmounts or state changes during countdown
		return () => clearInterval(intervalId);
	}, [isCapturing, countdown, photoTakenAscii, takePhotoNow]); // Dependencies

	const handleSaveAscii = async (): Promise<void> => {
		if (!photoTakenAscii) {
			toast.error("No photo has been taken to save.");
			return;
		}
		if (!title.trim()) {
			toast.error("Please enter a title before saving.");
			return;
		}

		try {
			const success = await saveAsciiToServer({
				title: title.trim(),
				content: photoTakenAscii,
			});

			if (success) {
				// Reset state after successful save
				retakePhoto(); // Go back to live view implicitly clears photo
				setTitle(""); // Clear the title
			} else {
				// The context hook should ideally throw an error or return error details
				toast.error("Failed to save ASCII art. Server might be unavailable.");
			}
		} catch (err) {
			console.error("Error saving ASCII art:", err);
			toast.error(
				`Failed to save ASCII art: ${
					err instanceof Error ? err.message : "Unknown error"
				}`
			);
			setErrorMessage(
				`Error connecting to server: ${
					err instanceof Error ? err.message : "Unknown error"
				}`
			);
		}
	};

	const retakePhoto = (): void => {
		setPhotoTakenAscii(null); // Clear the taken photo
		setErrorMessage(""); // Clear any previous errors
		// The capture loop useEffect will restart the loop automatically
	};

	// --- Render Logic ---

	// Determine what ASCII content to display (live feed or taken photo)
	const displayAscii = photoTakenAscii || asciiOutput;
	// Determine if *any* ASCII should be visible
	const showAscii = (isCapturing || photoTakenAscii) && !!displayAscii;

	// Conditional rendering for buttons in the footer
	const renderFooterButtons = () => {
		if (!isCapturing) {
			return (
				<Button onClick={startWebcam} className="flex items-center gap-2">
					<CameraIcon className="h-4 w-4" />
					Start Camera
				</Button>
			);
		} else if (photoTakenAscii) {
			// Photo has been taken
			return (
				<>
					<Button onClick={retakePhoto} className="flex items-center gap-2">
						<RotateCwIcon className="h-4 w-4" />
						Retake
					</Button>
					<Button
						onClick={handleSaveAscii}
						variant="outline"
						className="flex items-center gap-2"
						disabled={!title.trim()} // Disable save if no title
					>
						<SaveIcon className="h-4 w-4" />
						Save
					</Button>
					<Button
						onClick={stopWebcam}
						variant="destructive"
						className="flex items-center gap-2">
						<StopCircleIcon className="h-4 w-4" />
						Stop Camera
					</Button>
				</>
			);
		} else {
			// Camera is running, live view
			return (
				<>
					<Button
						onClick={triggerPhotoBooth}
						className="flex items-center gap-2"
						disabled={countdown !== null} // Disable while counting down
					>
						<CameraIcon className="h-4 w-4" />
						Take Photo
					</Button>
					<Button
						onClick={stopWebcam}
						variant="destructive"
						className="flex items-center gap-2">
						<StopCircleIcon className="h-4 w-4" />
						Stop Camera
					</Button>
				</>
			);
		}
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">ASCII Photo Booth</CardTitle>
				<CardDescription>
					Capture your live camera feed as ASCII art.
				</CardDescription>
			</CardHeader>

			{errorMessage && (
				<CardContent className="pt-0 pb-2 text-red-600">
					{/* Use a more prominent error display */}
					Error: {errorMessage}
				</CardContent>
			)}

			<CardContent className="space-y-6">
				{/* Title Input */}
				<div className="space-y-2">
					<Label htmlFor="title" className="text-sm font-medium">
						Title (required to save):
						<Input
							type="text"
							id="title"
							placeholder="Enter title for your art"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							maxLength={100} // Add max length
							disabled={isCapturing ? false : true}
						/>
					</Label>
				</div>

				{/* ASCII Display Area */}
				<div
					className={`relative  flex items-center justify-center overflow-hidden rounded-md border border-input ${
						backgroundColor === "white" ? "bg-white" : "bg-black"
					}`}
					style={{
						height: `${FIXED_BOX_HEIGHT_PX}px`,
						width: `${fixedBoxWidth}px`,
						margin: "0 auto",
					}}>
					{/* Flash Effect */}
					{isFlashing && (
						<div
							className="absolute inset-0 bg-white opacity-80 animate-fade-out z-20" // Ensure flash is on top
							style={{ animationDuration: `${FLASH_DURATION_MS}ms` }}
							key="flash" // Add key for potential animation re-trigger
						/>
					)}

					{/* ASCII Content */}
					{showAscii && (
						<pre
							className={`leading-none font-mono p-1 whitespace-pre ${
								backgroundColor === "white" ? "text-black" : "text-white"
							}`}
							style={{
								fontSize: `${fontSizeRem}rem`,
								overflow: "hidden",
								maxWidth: "100%",
								maxHeight: "100%",
							}}>
							{displayAscii}
						</pre>
					)}

					{/* Countdown Overlay */}
					{countdown !== null && (
						<div className="absolute inset-0 flex items-center justify-center z-10">
							<span className="text-white text-6xl font-bold">{countdown}</span>
						</div>
					)}

					{/* Inactive Camera Placeholder */}
					{!isCapturing && !photoTakenAscii && countdown === null && (
						<div className="flex flex-col items-center justify-center h-full text-white">
							<CameraIcon className="h-16 w-16 mb-4" />
							<p>Camera Inactive</p>
						</div>
					)}
				</div>

				{/* Controls Area */}
				<div className="space-y-4 pt-4">
					{/* ASCII Style Selector */}
					<div className="space-y-2">
						<Label htmlFor="asciiStyle">Select Ascii style</Label>
						<Select
							value={selectedAsciiStyle}
							onValueChange={setSelectedAsciiStyle}>
							<SelectTrigger id="asciiStyle">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Styles</SelectLabel>
									<SelectItem value={ASCII_CHARS.default}>Default</SelectItem>
									<SelectItem value={ASCII_CHARS.shades_light}>
										Shades light
									</SelectItem>
									<SelectItem value={ASCII_CHARS.shades_dark}>
										Shades dark
									</SelectItem>
									<SelectItem value={ASCII_CHARS.symbols1}>
										Symbols 1
									</SelectItem>
									<SelectItem value={ASCII_CHARS.symbols2}>
										Symbols 2
									</SelectItem>
									<SelectItem value={ASCII_CHARS.complex1}>
										Complex 1
									</SelectItem>
									<SelectItem value={ASCII_CHARS.complex2}>
										Complex 2
									</SelectItem>
									<SelectItem value={ASCII_CHARS.complex3}>
										Complex 3
									</SelectItem>
									<SelectItem value={ASCII_CHARS.extended}>Extended</SelectItem>
									<SelectItem value={ASCII_CHARS.minimal}>Minimal</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{/* Background Color Toggler */}
					<div className="space-y-2">
						<Label className="text-sm font-medium">Background Color:</Label>
						<div className="flex gap-2">
							<Button
								variant={backgroundColor === "black" ? "default" : "outline"}
								onClick={() => setBackgroundColor("black")}>
								Black
							</Button>
							<Button
								variant={backgroundColor === "white" ? "default" : "outline"}
								onClick={() => setBackgroundColor("white")}>
								White
							</Button>
						</div>
					</div>

					{/* Detail Slider */}
					<div className="space-y-2">
						<div className="flex justify-between text-sm font-medium">
							<Label htmlFor="detailSlider" id="detailSlider">
								Detail Level:
							</Label>
							<span>
								({asciiGridWidth}x{asciiGridHeight})
							</span>
						</div>
						<Slider
							id="detailSlider"
							value={[detailLevel]}
							min={1}
							max={20} // Keep max reasonable to avoid performance issues
							step={1}
							onValueChange={(vals) => setDetailLevel(vals[0])}
							aria-label="Detail Level"
							aria-labelledby="detailSlider"
						/>
					</div>

					{/* Frame Rate Slider */}
					<div className="space-y-2">
						<Label
							htmlFor="frameRateSlider"
							id="frameRateSlider"
							className="text-sm font-medium flex justify-between">
							<span>Frame Rate:</span>
							<span>{frameRate} fps</span>
						</Label>
						<Slider
							id="frameRateSlider"
							aria-labelledby="frameRateSlider"
							value={[frameRate]}
							min={1}
							max={30}
							step={1}
							onValueChange={(vals) => setFrameRate(vals[0])}
							disabled={!!photoTakenAscii} // Disable only if photo is taken
							aria-label="Frame Rate"
						/>
					</div>
				</div>

				{/* Debug Info (Optional - Conditionally Render for Dev Builds) */}
				{/*
        process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 mt-2 p-2 border rounded">
            <p>Debug Info:</p>
            <div>Status: {isCapturing ? 'Capturing' : 'Inactive'} {isVideoLoaded ? '(Loaded)' : '(Not Loaded)'}</div>
            <div>Photo Taken: {!!photoTakenAscii}</div>
            <div>ASCII Grid: {asciiGridWidth}x{asciiGridHeight}</div>
            <div>Font Size: {fontSizeRem.toFixed(3)}rem ({fontSizePx.toFixed(1)}px)</div>
            <div>Box Size: {fixedBoxWidth.toFixed(0)}x{FIXED_BOX_HEIGHT_PX}px</div>
            <div>Video Ref: {videoRef.current?.readyState} | Stream: {!!videoRef.current?.srcObject}</div>
          </div>
        )
        */}
			</CardContent>

			<CardFooter className="flex justify-center gap-4">
				{/* Render buttons based on state */}
				{renderFooterButtons()}
			</CardFooter>

			{/* Hidden Elements */}
			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted // Mute is important for autoplay permissions
				className="hidden"
				width={CANVAS_WIDTH} // Set attributes for clarity
				height={CANVAS_HEIGHT}
			/>
			<canvas ref={canvasRef} className="hidden" />
		</Card>
	);
};

export default CamToAscii;
