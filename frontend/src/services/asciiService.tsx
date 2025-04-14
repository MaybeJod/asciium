import axios from "axios";

let API_URL: string;

if (import.meta.env.MODE === "development") {
	API_URL = "http://localhost:4000/api";
	console.log("Using development API:", API_URL);
} else {
	API_URL = "https://asciium.vercel.app/api";
	console.log("Using production API:", API_URL);
}
// const API_URL = "http://localhost:4000/api";
// const API_URL = "https://asciium.vercel.app/api";

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

interface AsciiItem {
	_id: string;
	name: string;
	price: number | string;
	image: string;
}

//get all ascii items
export const getAsciiService = async (): Promise<ApiResponse<AsciiItem[]>> => {
	try {
		const response = await api.get("/ascii");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data as ApiResponse<AsciiItem[]>;
		}
		return {
			success: false,
			message: "Network error or server not responding",
		};
	}
};

//create a new ascii item
export const createAsciiService = async (
	ascii: Omit<AsciiItem, "_id">
): Promise<ApiResponse<AsciiItem>> => {
	try {
		const response = await api.post("/ascii", ascii);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data as ApiResponse<AsciiItem>;
		}
		return {
			success: false,
			message: "Network error or server not responding",
		};
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
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data as ApiResponse<AsciiItem>;
		}
		return {
			success: false,
			message: "Network error or server not responding",
		};
	}
};

//delete an ascii item
export const deleteAsciiService = async (
	id: string
): Promise<ApiResponse<null>> => {
	try {
		const response = await api.delete(`/ascii/${id}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data as ApiResponse<null>;
		}
		return {
			success: false,
			message: "Network error or server not responding",
		};
	}
};
