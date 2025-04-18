import { useState, useRef, useCallback, useEffect } from "react";
import { WebcamOptions } from "@/components/CamToAscii/types";

export function useWebcam(options: WebcamOptions) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isStreamActive, setIsStreamActive] = useState<boolean>(false);
	const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const stopMediaTracks = useCallback(() => {
		if (videoRef.current?.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach((track) => {
				track.stop();
			});
			videoRef.current.srcObject = null;
			//ensure loaded state is reset
			setIsVideoLoaded(false);
			//ensure active state is reset
			setIsStreamActive(false);
		}
	}, []);

	const startStream = useCallback(async (): Promise<boolean> => {
		setError("");
		//Reset state
		setIsStreamActive(false);
		setIsVideoLoaded(false);
		//ensure any previous stream is stopped
		stopMediaTracks();

		if (!navigator.mediaDevices?.getUserMedia) {
			setError("Webcam access not supported by this browser.");
			return false;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: options.canvasWidth },
					height: { ideal: options.canvasHeight },
					facingMode: "user",
				},
				audio: false,
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;

				await new Promise<void>((resolve, reject) => {
					if (!videoRef.current) {
						reject(new Error("Video element became null"));
						return;
					}

					const handleLoadedMetadata = () => {
						videoRef.current?.removeEventListener(
							"loadedmetadata",
							handleLoadedMetadata
						);
						videoRef.current?.removeEventListener("error", handleError);
						setIsVideoLoaded(true);
						resolve();
					};
					const handleError = (e: Event) => {
						videoRef.current?.removeEventListener(
							"loadedmetadata",
							handleLoadedMetadata
						);
						videoRef.current?.removeEventListener("error", handleError);
						console.error("Video error:", e);
						reject(new Error("Video element encountered an error"));
					};

					videoRef.current.addEventListener(
						"loadedmetadata",
						handleLoadedMetadata
					);
					videoRef.current.addEventListener("error", handleError);
				});

				await videoRef.current.play();
				setIsStreamActive(true);
				//indicate success
				return true;
			} else {
				throw new Error("Video element reference is not available.");
			}
		} catch (err) {
			console.error("Error accessing webcam:", err);
			//clean up
			stopMediaTracks();
			let specificError = "An unknown error occurred accessing the camera.";
			if (err instanceof Error) {
				//simplified error mapping for brevity, original was good
				switch (err.name) {
					case "NotAllowedError":
					case "PermissionDeniedError":
						specificError = "Camera access denied. Please grant permission.";
						break;
					case "NotFoundError":
					case "DevicesNotFoundError":
						specificError = "No camera found.";
						break;
					case "NotReadableError":
					case "TrackStartError":
						specificError = "Camera is busy or cannot be accessed.";
						break;
					case "OverconstrainedError":
						specificError = `Camera doesn't support requested resolution (${options.canvasWidth}x${options.canvasHeight}).`;
						break;
					default:
						specificError = `Error accessing camera: ${err.message}`;
				}
			}
			setError(specificError);
			//indicate failure
			return false;
		}
		//add options and stopMediaTracks
	}, [options.canvasWidth, options.canvasHeight, stopMediaTracks]);

	//cleanup effect
	useEffect(() => {
		return () => {
			stopMediaTracks();
		};
		//run cleanup when component unmounts or stopMediaTracks changes (it shouldn't)
	}, [stopMediaTracks]);

	return {
		videoRef,
		isStreamActive,
		isVideoLoaded,
		error,
		startStream,
		//expose the stop function
		stopStream: stopMediaTracks,
	};
}
