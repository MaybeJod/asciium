import { useAscii } from "@/contexts/AsciiArtContext";
import AsciiCard from "@/components/AsciiCard/AsciiArtCard";

const HomePage = () => {
	const { asciis, loading, error } = useAscii();

	if (loading) {
		return <div>Loading ASCII art...</div>;
	}

	if (error) {
		return <div>Error loading ASCII art: {error}</div>;
	}

	return (
		<section className="container mx-auto my-20">
			<h1 className="text-8xl mb-5">ASCII Art Gallery</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{asciis.map((ascii) => (
					<div key={ascii._id}>
						<AsciiCard ascii={ascii} />
					</div>
				))}
			</div>
		</section>
	);
};

export default HomePage;
