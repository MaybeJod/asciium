import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "sonner";
import { usePageFocusTrap } from "./hooks/usePageFocusTrap";
import Footer from "./components/Footer/Footer";

function App() {
	usePageFocusTrap();
	return (
		<>
			<Toaster richColors />
			<header>
				<Navbar />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/create" element={<CreatePage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
