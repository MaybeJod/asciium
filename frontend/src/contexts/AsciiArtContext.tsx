import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import {
	getAsciiService,
	createAsciiService,
	deleteAsciiService,
	updateAsciiService,
} from "../services/AsciiArtService";
import { toast } from "sonner";

export interface AsciiItem {
	_id: string;
	title: string;
	content: string;
	createdAt?: string;
	updatedAt?: string;
}

interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

interface SaveAsciiData {
	title: string;
	content: string;
}

interface AsciiContextType {
	asciis: AsciiItem[];
	loading: boolean;
	error: string | null;
	errorMessage: string | null;
	setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
	fetchAsciis: () => Promise<boolean>;
	createAscii: (ascii: Omit<AsciiItem, "_id">) => Promise<boolean>;
	updateAscii: (id: string, ascii: Partial<AsciiItem>) => Promise<boolean>;
	deleteAscii: (id: string) => Promise<boolean>;
	saveAsciiToServer: (data: SaveAsciiData) => Promise<boolean>; // Consistent return type
}

const AsciiContext = createContext<AsciiContextType | undefined>(undefined);

export const AsciiProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [asciis, setAsciis] = useState<AsciiItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const fetchAsciis = async (): Promise<boolean> => {
		setLoading(true);
		setError(null);
		try {
			const response = (await getAsciiService()) as ApiResponse<AsciiItem[]>;
			if (response.success) {
				if (response.data) {
					setAsciis(response.data);
					return true;
				} else {
					setError(response.message || "Failed to fetch ASCII items (no data)");
					return false;
				}
			} else {
				setError(response.message || "Failed to fetch ASCII items");
				return false;
			}
		} catch (err) {
			console.error("fetchAsciis error:", err);
			setError("Error connecting to server while fetching");
			return false;
		} finally {
			setLoading(false);
		}
	};

	const createAscii = async (
		ascii: Omit<AsciiItem, "_id">
	): Promise<boolean> => {
		setLoading(true);
		setError(null);
		try {
			const response = (await createAsciiService(
				ascii
			)) as ApiResponse<AsciiItem>;
			if (response.success && response.data) {
				setAsciis([...asciis, response.data]);
				toast.success(response.message || "ASCII art created successfully!");
				return true;
			} else {
				setError(response.message || "Failed to create ASCII art");
				toast.error(response.message || "Failed to create ASCII art");
				return false;
			}
		} catch (err) {
			setError("Error connecting to server while creating");
			console.error("Error creating ASCII art:", err);
			toast.error("Error creating ASCII art");
			return false;
		} finally {
			setLoading(false);
		}
	};

	const updateAscii = async (
		id: string,
		ascii: Partial<AsciiItem>
	): Promise<boolean> => {
		setLoading(true);
		setError(null);
		try {
			const response = (await updateAsciiService(
				id,
				ascii
			)) as ApiResponse<AsciiItem>;
			if (response.success && response.data) {
				setAsciis((prevAsciis) =>
					prevAsciis.map((item) => (item._id === id ? response.data! : item))
				);
				toast.success(response.message || "ASCII art updated successfully!");
				return true;
			} else {
				setError(response.message || "Failed to update ASCII art");
				toast.error(response.message || "Failed to update ASCII art");
				return false;
			}
		} catch (err) {
			setError("Error connecting to server while updating");
			console.error("Error updating ASCII art:", err);
			toast.error("Error updating ASCII art");
			return false;
		} finally {
			setLoading(false);
		}
	};

	const deleteAscii = async (id: string): Promise<boolean> => {
		setLoading(true);
		setError(null);
		try {
			const response = (await deleteAsciiService(id)) as ApiResponse<any>;
			if (response.success) {
				setAsciis(asciis.filter((item) => item._id !== id));
				toast.success(response.message || "ASCII art deleted successfully!");
				return true;
			} else {
				setError(response.message || "Failed to delete ASCII art");
				toast.error(response.message || "Failed to delete ASCII art");
				return false;
			}
		} catch (err) {
			setError("Error connecting to server while deleting");
			console.error("Error deleting ASCII art:", err);
			toast.error("Error deleting ASCII art");
			return false;
		} finally {
			setLoading(false);
		}
	};

	const saveAsciiToServer = async (data: SaveAsciiData): Promise<boolean> => {
		if (!data.content) {
			setErrorMessage("No ASCII art to save");
			return false;
		}

		try {
			const response = (await createAsciiService({
				title: data.title,
				content: data.content,
			})) as ApiResponse<AsciiItem>;

			if (response.success && response.data) {
				toast.success(response.message || "ASCII art saved successfully!");
				setAsciis((prevAsciis) => [...prevAsciis, response.data!]);
				console.log("saveAsciiToServer - Updated asciis:", [
					...asciis,
					response.data,
				]); // ADD THIS LOG
				return true;
			} else {
				setErrorMessage(
					`Failed to save ASCII art: ${response.message || "Unknown error"}`
				);
				toast.error(
					`Failed to save ASCII art: ${response.message || "Unknown error"}`
				);
				return false;
			}
		} catch (err) {
			console.error("Error saving ASCII art:", err);
			setErrorMessage("Error connecting to server while saving");
			toast.error("Error connecting to server while saving");
			return false;
		}
	};

	useEffect(() => {
		fetchAsciis();
		console.log("AsciiProvider - Initial fetch"); // ADD THIS LOG
	}, []);

	return (
		<AsciiContext.Provider
			value={{
				asciis,
				loading,
				error,
				errorMessage,
				setErrorMessage,
				fetchAsciis,
				createAscii,
				updateAscii,
				deleteAscii,
				saveAsciiToServer,
			}}>
			{children}
		</AsciiContext.Provider>
	);
};

export const useAscii = (): AsciiContextType => {
	const context = useContext(AsciiContext);
	if (context === undefined) {
		throw new Error("useAscii must be used within an AsciiProvider");
	}
	return context;
};
