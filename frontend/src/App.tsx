import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import GalleryPage from "./pages/GalleryPage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "sonner";
import { usePageFocusTrap } from "./hooks/usePageFocusTrap";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import ConsentBanner from "./components/ConsentBanner/ConsentBanner";

function App() {
	usePageFocusTrap();

	return (
		<>
			<ConsentBanner />
			<Toaster richColors />

			<Navbar />

			<main className="container mx-auto my-20">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/gallery" element={<GalleryPage />} />
					<Route path="/create" element={<CreatePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
