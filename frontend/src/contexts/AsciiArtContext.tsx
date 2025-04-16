import React, { createContext, useState, useContext, ReactNode } from "react";
import { createAsciiService } from "../services/AsciiArtService";
import { toast } from "sonner";

interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

interface AsciiContextType {
	saveAsciiToServer: (asciiOutput: string | null) => Promise<boolean>;
	errorMessage: string | null;
	setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const AsciiContext = createContext<AsciiContextType | undefined>(undefined);

export const AsciiProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const saveAsciiToServer = async (
		asciiOutput: string | null
	): Promise<boolean> => {
		if (!asciiOutput) {
			setErrorMessage("No ASCII art to save");
			return false;
		}

		try {
			const response = (await createAsciiService({
				title: "Generated ASCII", // You might want to let the user name it
				// price: "0",
				content: asciiOutput, // Assuming your backend can handle the ASCII string as "image" data
			})) as ApiResponse<any>; // Adjust the type based on your actual backend response for a single saved item

			if (response.success) {
				// toast.success("ASCII art saved successfully!");
				return true;
			} else {
				setErrorMessage(
					`Failed to save ASCII art: ${response.message || "Unknown error"}`
				);
				return false;
			}
		} catch (err) {
			console.error("Error saving ASCII art:", err);
			setErrorMessage("Error connecting to server");
			return false;
		}
	};

	return (
		<AsciiContext.Provider
			value={{
				saveAsciiToServer,
				errorMessage,
				setErrorMessage,
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
