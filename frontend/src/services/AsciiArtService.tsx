import axios from "axios";

let API_URL: string;

if (import.meta.env.MODE === "development") {
	API_URL = "http://localhost:4000/api";
	console.log("Using development API:", API_URL);
} else {
	API_URL = "http://localhost:4000/api";
	console.log("Using production API:", API_URL);
}

//create an axios instance
const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export interface AsciiItem {
	_id: string;
	title: string;
	content: string;
}

const handleRequestError = <T,>(error: any): ApiResponse<T> => {
	if (axios.isAxiosError(error) && error.response) {
		console.error("API error response:", error.response.data);
		return error.response.data as ApiResponse<T>;
	}
	console.error("API network error:", error);
	return {
		success: false,
		message: "Network error or server not responding",
	};
};

//get all ascii items
export const getAsciiService = async (): Promise<ApiResponse<AsciiItem[]>> => {
	try {
		const response = await api.get("/ascii");
		return response.data;
	} catch (error: any) {
		return handleRequestError<AsciiItem[]>(error);
	}
};

//create a new ascii item
export const createAsciiService = async (
	ascii: Omit<AsciiItem, "_id">
): Promise<ApiResponse<AsciiItem>> => {
	try {
		const response = await api.post("/ascii", ascii);
		return response.data;
	} catch (error: any) {
		return handleRequestError<AsciiItem>(error);
	}
};

//update an ascii item
export const updateAsciiService = async (
	id: string,
	ascii: Partial<AsciiItem>
): Promise<ApiResponse<AsciiItem>> => {
	try {
		const response = await api.put(`/ascii/${id}`, ascii);
		return response.data;
	} catch (error: any) {
		return handleRequestError<AsciiItem>(error);
	}
};

//delete an ascii item
export const deleteAsciiService = async (
	id: string
): Promise<ApiResponse<null>> => {
	try {
		const response = await api.delete(`/ascii/${id}`);
		return response.data;
	} catch (error: any) {
		return handleRequestError<null>(error);
	}
};
