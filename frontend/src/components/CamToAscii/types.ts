export interface AsciiSettings {
	frameRate: number;
	detailLevel: number;
	asciiChars: string;
	canvasWidth: number;
	canvasHeight: number;
}

export interface WebcamOptions {
	canvasWidth: number;
	canvasHeight: number;
}

export interface AsciiSavePayload {
	title: string;
	content: string;
}
