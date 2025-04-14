import AsciiForm from "@/components/AsciiForm/AsciiForm";
import { AsciiProvider } from "@/contexts/AsciiContext";

export default function CreatePage() {
	return (
		<>
			<AsciiProvider>
				<section className="flex justify-center">
					<AsciiForm />
				</section>
			</AsciiProvider>
		</>
	);
}
