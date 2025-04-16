import express from "express";

import {
	createAscii,
	deleteAscii,
	getAscii,
	updateAscii,
} from "../controllers/AsciiArtController.js";

const router = express.Router();

router.get("/", getAscii);

router.post("/", createAscii);

router.put("/:id", updateAscii);

router.delete("/:id", deleteAscii);

export default router;
