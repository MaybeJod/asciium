import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/darkMode/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AsciiProvider } from "./contexts/AsciiArtContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<AsciiProvider>
					<App />
				</AsciiProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
