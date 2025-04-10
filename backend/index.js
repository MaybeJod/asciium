import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from "./config/db.js";
import asciiRoutes from "./routes/asciiRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? process.env.PRODUCTION_URL
				: "http://localhost:5174",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

//allows us to accept json data in the req.body
app.use(express.json());

app.use("/api/ascii", asciiRoutes);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
	});
}

app.listen(port, () => {
	connectDB();
	console.log(`server started at http://localhost:${port}`);
});
