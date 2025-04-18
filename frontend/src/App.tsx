import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "sonner";
import { usePageFocusTrap } from "./hooks/usePageFocusTrap";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	usePageFocusTrap();
	return (
		<>
			<Toaster richColors />

			<Navbar />

			<main className="container mx-auto my-20">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/create" element={<CreatePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
