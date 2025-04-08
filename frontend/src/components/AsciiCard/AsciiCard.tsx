import { useAscii } from "@/contexts/AsciiContext";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
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

export default function AsciiCard({ ascii }) {
	const { deleteAscii, updateAscii } = useAscii();
	const [updatedAscii, setUpdatedAscii] = useState({
		name: ascii.name,
		price: ascii.price,
		image: ascii.image,
	});

	const handleUpdateAscii = async () => {
		try {
			const result = await updateAscii(ascii._id, updatedAscii);

			if (typeof result === "boolean") {
				if (result) {
					toast.success("ASCII item updated successfully");
				} else {
					toast.error("Failed to update ASCII item");
				}
			} else {
				const { success, message } = result;
				if (success) {
					toast.success(message || "ASCII item updated successfully");
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
			// Rest of your delete function remains the same
			const result = await deleteAscii(ascii._id);

			if (typeof result === "boolean") {
				if (result) {
					toast.success("ASCII item deleted successfully");
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
				<CardTitle>{ascii.name}</CardTitle>
				<CardDescription>ID:{ascii._id}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<img
					src={ascii.image}
					alt={ascii.name}
					className="w-1/2 object-cover"
				/>
				<p>Price:{ascii.price}</p>
			</CardContent>
			<CardFooter className="items-center flex justify-center gap-1">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant={"outline"}>Edit</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Ascii</DialogTitle>
							<DialogDescription>
								Make changes to your Ascii here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									value={updatedAscii.name}
									className="col-span-3"
									onChange={(e) =>
										setUpdatedAscii({ ...updatedAscii, name: e.target.value })
									}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="price" className="text-right">
									Price
								</Label>
								<Input
									id="price"
									value={updatedAscii.price}
									className="col-span-3"
									onChange={(e) =>
										setUpdatedAscii({ ...updatedAscii, price: e.target.value })
									}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="image" className="text-right">
									Image
								</Label>
								<Input
									id="image"
									value={updatedAscii.image}
									className="col-span-3"
									onChange={(e) =>
										setUpdatedAscii({ ...updatedAscii, image: e.target.value })
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="button" onClick={handleUpdateAscii}>
								Save changes
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<Button type="button" onClick={handleDeleteAscii}>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
