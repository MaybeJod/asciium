import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAscii } from "../../contexts/AsciiContext";
import { toast } from "sonner";

export default function AsciiForm() {
	const { createAscii, loading } = useAscii();
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		image: "",
	});

	const handleCreateAscii = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		//simple validation
		if (!formData.name || !formData.price || !formData.image) {
			toast.error("All fields are required");
			return;
		}

		const result = await createAscii({
			name: formData.name,
			price: formData.price,
			image: formData.image,
		});

		if (result) {
			//reset form
			setFormData({
				name: "",
				price: "",
				image: "",
			});
			toast.success("ascii saved");
		}
	};

	return (
		<div className="w-full max-w-sm">
			<h2 className="text-xl font-bold mb-4">Create New ASCII Art</h2>

			<form onSubmit={handleCreateAscii} className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="name">Name</Label>
					<Input
						type="text"
						id="name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						disabled={loading}
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="price">Price</Label>
					<Input
						type="number"
						id="price"
						value={formData.price}
						onChange={(e) =>
							setFormData({ ...formData, price: e.target.value })
						}
						disabled={loading}
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="image">Image (ASCII or URL)</Label>
					<Input
						type="text"
						id="image"
						value={formData.image}
						onChange={(e) =>
							setFormData({ ...formData, image: e.target.value })
						}
						disabled={loading}
					/>
				</div>

				<Button type="submit" className="mt-2" disabled={loading}>
					{loading ? (
						<span className="flex items-center gap-2">Creating...</span>
					) : (
						"Create ASCII Art"
					)}
				</Button>
			</form>
		</div>
	);
}
