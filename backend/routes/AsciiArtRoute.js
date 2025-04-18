import express from "express";

import {
	createAscii,
	deleteAscii,
	getAscii,
	updateAscii,
	validateAsciiCreate,
	validateAsciiUpdate,
	validateAsciiDelete,
} from "../controllers/AsciiArtController.js";

const router = express.Router();

//get all ascii arts
router.get("/", getAscii);

//create new ascii art with validation
router.post("/", validateAsciiCreate, createAscii);

//update ascii art title with validation
router.put("/:id", validateAsciiUpdate, updateAscii);

//delete ascii art with validation
router.delete("/:id", validateAsciiDelete, deleteAscii);

export default router;
