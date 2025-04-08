import { Link } from "react-router-dom";
import { useAscii } from "@/contexts/AsciiContext";
import { useEffect } from "react";
import AsciiCard from "@/components/AsciiCard/AsciiCard";

export default function HomePage() {
	const { fetchAsciis, asciis, loading, error } = useAscii();

	useEffect(() => {
		fetchAsciis();
	}, []);

	return (
		<main className="m-19">
			<h2>Current Ascii</h2>

			{loading && <p>Loading...</p>}

			{error && <p>Error: {error}</p>}

			{!loading && asciis.length > 0 ? (
				<section className="grid grid-cols-3 gap-3 ">
					{asciis.map((ascii) => (
						<AsciiCard key={ascii._id} ascii={ascii} />
					))}
				</section>
			) : (
				<div>
					{!loading && <p>No Ascii found :(</p>}
					<Link to="/create">Create new Ascii</Link>
				</div>
			)}
		</main>
	);
}
