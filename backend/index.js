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
				: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

//allows us to accept json data in the req.body
app.use(express.json());

app.use("/api/ascii", asciiRoutes);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
	// Only use this for traditional deployments, not for Vercel
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", function (_, res) {
		res.sendFile(
			path.join(__dirname, "../frontend/dist/index.html"),
			function (err) {
				if (err) {
					res.status(500).send(err);
				}
			}
		);
	});
}

app.listen(port, () => {
	connectDB();
	console.log(`server started at http://localhost:${port}`);
});
