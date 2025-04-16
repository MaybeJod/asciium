import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CameraIcon, StopCircleIcon } from "lucide-react";

// const asciiChars = " .,:;i1tfLCG08@";
// const asciiChars = "#@80GCLft1i;:,. ";
// const asciiChars = "o O v V T L 7 U c C x X";
// const asciiChars = "        .:░▒▓█";
// const asciiChars = "█▓▒░:.    ";
// const asciiChars = "_______.:!/r(l1Z4H9W8$@";
// const asciiChars = " .,:;i1tfLCG08@";
// const asciiChars = " .:-=+*#%@";
const asciiChars = "@%#*+=-:. ";
// const asciiChars = "Ñ@#W$9876543210?!abc;:+=-,._          ";
// const asciiChars = ` ~ ! ^ ( ) - _ + = ; : ' " , . \ / | < > [ ] { }`;

const WebcamToAscii: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [asciiOutput, setAsciiOutput] = useState("");
	const [isCapturing, setIsCapturing] = useState(false);
	const animationFrameIdRef = useRef<number | null>(null);

	const width = 120;
	const height = 80;

	useEffect(() => {
		return () => {
			stopWebcam();
		};
	}, []);

	const startWebcam = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
				setIsCapturing(true);
				startCapturing();
			}
		} catch (err) {
			console.error("Failed to start webcam:", err);
		}
	};

	const stopWebcam = () => {
		if (animationFrameIdRef.current) {
			cancelAnimationFrame(animationFrameIdRef.current);
		}
		if (videoRef.current?.srcObject) {
			const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
			tracks.forEach((track) => track.stop());
			videoRef.current.srcObject = null;
		}
		setIsCapturing(false);
		setAsciiOutput("");
	};

	const startCapturing = () => {
		const captureFrame = () => {
			if (!videoRef.current || !canvasRef.current) return;
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d", { willReadFrequently: true });
			if (!ctx) return;

			canvas.width = width;
			canvas.height = height;

			ctx.drawImage(videoRef.current, 0, 0, width, height);
			const imageData = ctx.getImageData(0, 0, width, height);
			setAsciiOutput(imageDataToAscii(imageData));

			animationFrameIdRef.current = requestAnimationFrame(captureFrame);
		};
		captureFrame();
	};

	const imageDataToAscii = (imageData: ImageData): string => {
		const { data } = imageData;
		let ascii = "";

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const idx = (y * width + x) * 4;
				const r = data[idx];
				const g = data[idx + 1];
				const b = data[idx + 2];

				const gray = 0.299 * r + 0.587 * g + 0.114 * b;
				const charIndex = Math.floor((gray * (asciiChars.length - 1)) / 255);
				ascii += asciiChars[charIndex];
			}
			ascii += "\n";
		}
		return ascii;
	};

	return (
		<Card className="w-full max-w-4xl mx-auto my-10">
			<CardContent className="p-4 space-y-4">
				<div className="flex justify-between">
					{!isCapturing ? (
						<Button onClick={startWebcam} className="flex items-center gap-2">
							<CameraIcon className="w-4 h-4" />
							Start Camera
						</Button>
					) : (
						<Button
							onClick={stopWebcam}
							variant="destructive"
							className="flex items-center gap-2">
							<StopCircleIcon className="w-4 h-4" />
							Stop Camera
						</Button>
					)}
				</div>

				<canvas ref={canvasRef} className="hidden" />

				<video ref={videoRef} autoPlay playsInline muted className="hidden" />

				<pre className="font-mono text-[0.45rem] leading-[0.5] text-black bg-lime-300 p-4 rounded-md whitespace-pre overflow-auto max-h-[80vh]">
					{asciiOutput || "Waiting for ASCII..."}
				</pre>
			</CardContent>
		</Card>
	);
};

export default WebcamToAscii;
