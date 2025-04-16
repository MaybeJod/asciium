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
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Ascii = mongoose.model("AsciiArt", AsciiArtSchema);

export default Ascii;
