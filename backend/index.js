import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import asciiRoutes from "./routes/asciiRoutes.js";

dotenv.config();

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//routes
app.use("/api/ascii", asciiRoutes);

//connect to db
mongoose
	.connect(mongoURI)
	.then(() => {
		//listen for requests
		app.listen(port, () => {
			console.log("connected to db & listen on port " + port);
		});
	})
	.catch((error) => {
		console.log(error);
	});
