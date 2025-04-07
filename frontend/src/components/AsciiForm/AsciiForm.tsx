import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAscii } from "../../contexts/AsciiContext";

export default function AsciiForm() {
	const { createAscii, loading, error } = useAscii();
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		image: "",
	});
	const [localError, setLocalError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleCreateAscii = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setLocalError("");
		setSuccess(false);

		//simple validation
		if (!formData.name || !formData.price || !formData.image) {
			setLocalError("All fields are required");
			return;
		}

		const result = await createAscii({
			name: formData.name,
			price: formData.price,
			image: formData.image,
		});

		if (result) {
			setSuccess(true);
			//reset form
			setFormData({
				name: "",
				price: "",
				image: "",
			});
			//auto-hide success message after 3 seconds
			setTimeout(() => setSuccess(false), 3000);
		}
	};

	return (
		<div className="w-full max-w-sm">
			<h2 className="text-xl font-bold mb-4">Create New ASCII Art</h2>

			{(localError || error) && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{localError || error}
				</div>
			)}

			{success && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
					ASCII art created successfully!
				</div>
			)}

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
						<span className="flex items-center gap-2">
							<svg
								className="animate-spin h-4 w-4 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Creating...
						</span>
					) : (
						"Create ASCII Art"
					)}
				</Button>
			</form>
		</div>
	);
}
