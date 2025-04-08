import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/darkMode/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AsciiProvider } from "./contexts/AsciiContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AsciiProvider>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<App />
				</ThemeProvider>
			</AsciiProvider>
		</BrowserRouter>
	</StrictMode>
);
