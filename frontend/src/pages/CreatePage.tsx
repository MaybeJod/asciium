import AsciiForm from "@/components/AsciiForm/AsciiForm";
// import { AsciiProvider } from "@/contexts/AsciiContext";
// import WebcamToAscii from "../components/CamToAscii/AsciiPage";
import CamToAscii from "@/components/CamToAscii/CamToAscii";
import { AsciiProvider } from "@/contexts/AsciiArtContext";

export default function CreatePage() {
	return (
		<>
			<AsciiProvider>
				<div className="container mx-auto">
					<h1 className="text-3xl font-bold">CamToAscii</h1>
					<CamToAscii />
				</div>
				{/* <section className="flex justify-center">
					<AsciiForm />
				</section> */}
			</AsciiProvider>
		</>
	);
}
