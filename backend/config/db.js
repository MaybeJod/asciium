// import mongoose from "mongoose";

// export const connectDB = async () => {
// 	const mongoUri = process.env.MONGO_URI;
// 	try {
// 		const conn = await mongoose.connect(mongoUri);
// 		console.log(`MongoDB Connected: ${conn.connection.host}`);
// 	} catch (error) {
// 		console.error(`Error: ${error.message}`);
// 		process.exit(1); //process code 1 means exit with failure, 0 means success
// 	}
// };

import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
	if (isConnected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		isConnected = true;
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};
