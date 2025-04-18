import mongoose from "mongoose";

const AsciiArtSchema = new mongoose.Schema(
	{
		//image
		content: {
			type: String,
			required: true,
			maxLength: [50000, "Content cannot exceed 50000 characters"],
		},
		//title
		title: {
			type: String,
			require: true,
			maxLength: [100, "Title cannot exceed 100 characters"],
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Ascii = mongoose.model("AsciiArt", AsciiArtSchema);

export default Ascii;
