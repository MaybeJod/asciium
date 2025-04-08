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
	updateAsciiService,
	deleteAsciiService,
} from "../services/asciiService";

export interface AsciiItem {
	_id: string;
	name: string;
	price: number | string;
	image: string;
}

interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

interface AsciiContextType {
	asciis: AsciiItem[];
	loading: boolean;
	error: string | null;
	fetchAsciis: () => Promise<boolean>;
	createAscii: (ascii: Omit<AsciiItem, "_id">) => Promise<boolean>;
	updateAscii: (id: string, ascii: Partial<AsciiItem>) => Promise<boolean>;
	deleteAscii: (id: string) => Promise<boolean>;
}

//create the context with default undefined value but typed
const AsciiContext = createContext<AsciiContextType | undefined>(undefined);

//create a provider component
export const AsciiProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [asciis, setAsciis] = useState<AsciiItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchAsciis = async (): Promise<boolean> => {
		setLoading(true);
		setError(null);
		try {
			const response = (await getAsciiService()) as ApiResponse<AsciiItem[]>;
			if (response.success) {
				setAsciis(response.data);
				return true;
			} else {
				setError(response.message || "Unknown error");
				return false;
			}
		} catch (err) {
			setError("Failed to fetch ASCII items");
			console.error(err);
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
			if (response.success) {
				setAsciis([...asciis, response.data]);
				return true;
			} else {
				setError(response.message || "Unknown error");
				return false;
			}
		} catch (err) {
			setError("Failed to create ASCII item");
			console.error(err);
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
			if (response.success) {
				setAsciis(
					asciis.map((item) => (item._id === id ? response.data : item))
				);
				return true;
			} else {
				setError(response.message || "Unknown error");
				return false;
			}
		} catch (err) {
			setError("Failed to update ASCII item");
			console.error(err);
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
				return true;
			} else {
				setError(response.message || "Unknown error");
				return false;
			}
		} catch (err) {
			setError("Failed to delete ASCII item");
			console.error(err);
			return false;
		} finally {
			setLoading(false);
		}
	};

	//load initial data
	useEffect(() => {
		fetchAsciis();
	}, []);

	return (
		<AsciiContext.Provider
			value={{
				asciis,
				loading,
				error,
				fetchAsciis,
				createAscii,
				updateAscii,
				deleteAscii,
			}}>
			{children}
		</AsciiContext.Provider>
	);
};

//custom hook for easy context usage
export const useAscii = (): AsciiContextType => {
	const context = useContext(AsciiContext);
	if (context === undefined) {
		throw new Error("useAscii must be used within an AsciiProvider");
	}
	return context;
};
