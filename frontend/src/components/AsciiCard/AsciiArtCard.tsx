import { AsciiItem } from "@/services/AsciiArtService";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import "./AsciiArtCard.css";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
} from "../ui/dialog";
import { useAscii } from "@/contexts/AsciiArtContext";

export default function AsciiCard({ ascii }: { ascii: AsciiItem }) {
	const { deleteAscii, fetchAsciis } = useAscii();

	const handleEdit = () => {
		console.log("edit");
	};
	const handleDelete = () => {
		deleteAscii(ascii._id);
		fetchAsciis();
		console.log("delete");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{ascii.title}</CardTitle>
				<CardDescription>ID: {ascii._id}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center overflow-hidden max-w-100">
				{" "}
				{/* Initially hide overflow */}
				<div className=" ascii-art text-yellow-500 text-[0.5rem]">
					{ascii.content}
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">View Full</Button>
					</DialogTrigger>
					<DialogContent className="max-w-screen-md max-h-screen-md overflow-auto">
						<DialogHeader>
							<DialogTitle>{ascii.title} - Full View</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							<pre className="ascii-art">{ascii.content}</pre>
						</DialogDescription>
					</DialogContent>
				</Dialog>
			</CardContent>
			<CardFooter className="items-center flex justify-center gap-2">
				<Button variant="outline" onClick={handleEdit}>
					Edit
				</Button>
				<Button variant="destructive" onClick={handleDelete}>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
