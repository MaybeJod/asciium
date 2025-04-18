import Ascii from "../models/AsciiArtModel.js";
import { body, param, validationResult } from "express-validator";

//validation middleware
export const validateAsciiCreate = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ max: 100 })
		.withMessage("Title cannot exceed 100 characters")
		.escape(),
	body("content").notEmpty().withMessage("Content is required"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array(),
			});
		}
		next();
	},
];

export const validateAsciiUpdate = [
	param("id").isMongoId().withMessage("Invalid ASCII art ID"),
	body("title")
		.optional()
		.trim()
		.isLength({ max: 100 })
		.withMessage("Title cannot exceed 100 characters")
		.escape(),
	body("content")
		.optional()
		.isLength({ max: 50000 })
		.withMessage("Content is too long"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array(),
			});
		}
		next();
	},
];

export const validateAsciiDelete = [
	param("id").isMongoId().withMessage("Invalid ASCII art ID"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array(),
			});
		}
		next();
	},
];

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
	try {
		const newAscii = new Ascii({
			title: req.body.title,
			content: req.body.content,
		});

		await newAscii.save();
		res.status(201).json({ success: true, data: newAscii });
	} catch (error) {
		console.error("Error in Create Ascii:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateAscii = async (req, res) => {
	const { id } = req.params;
	const updates = {};

	if (req.body.title !== undefined) updates.title = req.body.title;
	if (req.body.content !== undefined) updates.content = req.body.content;

	try {
		const updatedAscii = await Ascii.findByIdAndUpdate(id, updates, {
			new: true,
		});

		if (!updatedAscii) {
			return res.status(404).json({
				success: false,
				message: "ASCII art not found",
			});
		}

		res.status(200).json({ success: true, data: updatedAscii });
	} catch (error) {
		res.status(500).json({ success: false, message: "server error" });
	}
};

export const deleteAscii = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await Ascii.findByIdAndDelete(id);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: "ASCII art not found",
			});
		}

		res.status(200).json({ success: true, message: "ascii deleted" });
	} catch (error) {
		console.log("error in deleting ascii art");
		res.status(500).json({ success: false, message: "server error" });
	}
};
