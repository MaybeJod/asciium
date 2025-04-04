import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Ascii from "./models/asciiModel.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json()); //allows us to accept json data in the req.body

app.get("/ascii", (req, res) => {
	res.send("Sever is ready to mingle");
});

app.post("/ascii", async (req, res) => {
	const ascii = req.body;

	if (!ascii.name || !ascii.price || !ascii.image) {
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
});

app.listen(port, () => {
	connectDB();
	console.log(`server started at http://localhost:${port}`);
});
