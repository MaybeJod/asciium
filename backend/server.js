import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import asciiRoutes from "./routes/asciiRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

//allows us to accept json data in the req.body
app.use(express.json());

app.use("/api/ascii", asciiRoutes);

app.listen(port, () => {
	connectDB();
	console.log(`server started at http://localhost:${port}`);
});
