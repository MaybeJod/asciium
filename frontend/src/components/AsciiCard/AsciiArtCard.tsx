import { useAscii } from "@/contexts/AsciiArtContext";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "../ui/card";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
	DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AsciiItem } from "@/contexts/AsciiArtContext";
import "./AsciiArtCard.css";

export default function AsciiCard({ ascii }: { ascii: AsciiItem }) {
	const { deleteAscii, updateAscii, fetchAsciis } = useAscii();

	const [updatedTitle, setUpdatedTitle] = useState(ascii.title);

	const handleUpdateTitle = async () => {
		try {
			const result = await updateAscii(ascii._id, { title: updatedTitle });

			if (typeof result === "boolean") {
				if (result) {
				} else {
					toast.error("Failed to update ASCII item");
				}
			} else {
				const { success, message } = result;
				if (success) {
					await fetchAsciis(); // Re-fetch to update the list
				} else {
					toast.error(message || "Failed to update ASCII item");
				}
			}
		} catch (error) {
			console.error("Error updating ASCII:", error);
			toast.error("An unexpected error occurred");
		}
	};

	const handleDeleteAscii = async () => {
		try {
			const result = await deleteAscii(ascii._id);

			if (typeof result === "boolean") {
				if (result) {
					await fetchAsciis();
				} else {
					toast.error("Failed to delete ASCII item");
				}
			} else {
				const { success, message } = result;
				if (success) {
					toast.success(message || "ASCII item deleted successfully");
				} else {
					toast.error(message || "Failed to delete ASCII item");
				}
			}
		} catch (error) {
			console.error("Error deleting ASCII:", error);
			toast.error("An unexpected error occurred");
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{ascii.title}</CardTitle>
				<CardDescription>
					{/* ID:{ascii._id} <br /> */}
					Created at: {ascii.createdAt}
					<br />
					Updated Date:{ascii.updatedAt}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center overflow-hidden">
				<figure className="ascii-art max-h-100 overflow-hidden mb-2 text-[0.16rem]">
					{ascii.content}
				</figure>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant={"outline"}>Edit</Button>
					</DialogTrigger>
					{/* edit */}
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit ASCII Title</DialogTitle>
							<DialogDescription>
								Change the title of your ASCII art here. Click save when you're
								done.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="title" className="text-right">
									Title
								</Label>
								<Input
									id="title"
									value={updatedTitle}
									className="col-span-full"
									onChange={(e) => setUpdatedTitle(e.target.value)}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="button" onClick={handleUpdateTitle}>
								Save changes
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				{/* view full */}
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">View Full</Button>
					</DialogTrigger>
					<DialogContent className="overflow-auto max-h-[80dvh] min-w-[90dvw]">
						<DialogHeader>
							<DialogTitle>{ascii.title}</DialogTitle>
						</DialogHeader>
						<DialogDescription>Full view</DialogDescription>
						<span className="ascii-art text-[0.5rem] text-center">
							{ascii.content}
						</span>
					</DialogContent>
				</Dialog>
			</CardContent>
			<CardFooter className="flex justify-center ">
				<Button type="button" variant="destructive" onClick={handleDeleteAscii}>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
