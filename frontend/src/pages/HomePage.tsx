import { useAscii } from "@/contexts/AsciiArtContext";
import AsciiCard from "@/components/AsciiCard/AsciiArtCard";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
	const { asciis, loading, error } = useAscii();

	if (loading) {
		return (
			<section className="h-[80dvh] mt-20 flex flex-col justify-center items-center whitespace-pre-wrap font-mono text-center gap-10">
				<h1 className="text-4xl animate-pulse">Loading ASCII Art Gallery...</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* skeleton loader Cards */}
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="animate-pulse">
							<Skeleton className="h-[200px] w-full rounded-md" />
							<div className="p-4">
								<Skeleton className="h-6 w-3/4 mb-2" />
								<Skeleton className="h-4 w-1/2" />
								<div className="mt-4 flex justify-center space-x-2">
									<Skeleton className="h-8 w-20 rounded-md" />
									<Skeleton className="h-8 w-20 rounded-md" />
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="h-[80dvh] mt-20 flex flex-col justify-center items-center whitespace-pre-wrap font-mono text-center gap-10">
				<h1 className="text-4xl">Error loading ASCII art: {error}</h1>
			</section>
		);
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
