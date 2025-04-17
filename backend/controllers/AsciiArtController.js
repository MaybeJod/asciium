import mongoose from "mongoose";
import Ascii from "../models/AsciiArtModel.js";

export const getAscii = async (req, res) => {
	try {
		const ascii = await Ascii.find({});
		res.status(200).json({ success: true, data: ascii });
	} catch (error) {
		console.log("error in fetching ascii", error.message);
		res.status(500).json({ success: false, message: "server error" });
	}
};

export const createAscii = async (req, res) => {
	const ascii = req.body;

	if (!ascii.content || !ascii.title) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all fields" });
	}

	const newAscii = new Ascii(ascii);

	try {
		await newAscii.save();
		res.status(201).json({ success: true, data: newAscii });
	} catch (error) {
		console.error("Error in Create Ascii:", newAscii);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateAscii = async (req, res) => {
	const { id } = req.params;
	const ascii = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "invalid ascii id" });
	}

	try {
		const updatedAscii = await Ascii.findByIdAndUpdate(id, ascii, {
			new: true,
		});
		res.status(200).json({ success: true, data: updatedAscii });
	} catch (error) {
		res.status(500).json({ success: false, message: "sever error" });
	}
};

export const deleteAscii = async (req, res) => {
	const { id } = req.params;
	console.log("id", id);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "invalid ascii id" });
	}

	try {
		await Ascii.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "ascii deleted" });
	} catch (error) {
		console.log("error in deleting product");
		res.status(500).json({ success: false, message: "server error" });
	}
};
