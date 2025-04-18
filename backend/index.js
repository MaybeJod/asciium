import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";

import { connectDB } from "./config/db.js";
// import asciiRoutes from "./routes/asciiRoute.js";
import asciiArtRoutes from "./routes/AsciiArtRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve();

//middleware
//allows us to accept json data in the req.body
app.use(express.json());

//prevent NoSQL injection,
//remove any keys containing prohibited characters like $ or . from the request body, params, and query, which prevents MongoDB operator injection.
app.use(ExpressMongoSanitize());

//cors config
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "https://asciium.vercel.app/api"
				: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

//rate limiter
const apiLimiter = rateLimit({
	// 15 minutes
	windowMs: 15 * 60 * 1000,
	// limit each IP to 100 requests per windowMs
	max: 100,
	message: "Too many requests, please try again after 15 minutes",
});

app.use("/api", apiLimiter);

//routes
// app.use("/api/ascii", asciiRoutes);
app.use("/api/ascii", asciiArtRoutes);

//serve static files
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(port, () => {
	connectDB();
	console.log(`server started at http://localhost:${port}`);
});
