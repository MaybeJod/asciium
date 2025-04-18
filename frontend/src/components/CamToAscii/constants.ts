export const ASCII_CHAR_MAP = {
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

export type AsciiStyle = keyof typeof ASCII_CHAR_MAP;

export const DEFAULT_FRAMERATE = 15;
export const DEFAULT_DETAIL_LEVEL = 4;
//fixed internal canvas resolution
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 1000;
//fixed height of the display box
export const FIXED_BOX_HEIGHT_PX = 500;
//approx width/height ratio
export const FONT_SIZE_CHAR_WIDTH_RATIO = 0.6;
//1rem = 16px
export const FONT_SIZE_PX_TO_REM_FACTOR = 0.0625;
export const FLASH_DURATION_MS = 300;
export const COUNTDOWN_SECONDS = 3;
export const ASCII_GRID_BASE_WIDTH_FACTOR = 16;
export const ASCII_GRID_BASE_HEIGHT_FACTOR = 12;
