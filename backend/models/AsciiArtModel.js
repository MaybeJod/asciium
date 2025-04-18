import mongoose from "mongoose";

const AsciiArtSchema = new mongoose.Schema(
	{
		//image
		content: {
			type: String,
			required: true,
		},
		//title
		title: {
			type: String,
			require: true,
			maxLength: [100, "Title cannot exceed 100 characters"],
			match: [/^[a-zA-Z0-9 .,!?()-]+$/, "Title contains invalid characters"],
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Ascii = mongoose.model("AsciiArt", AsciiArtSchema);

export default Ascii;
