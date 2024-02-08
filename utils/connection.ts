//IMPORT MONGOOSE
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION;

// connection function
export const entryDBConnect = async () => {
	const EntrySchema = new mongoose.Schema({});

	const conn = await mongoose.connect(MONGODB_URL as string).catch((err) => console.log(err));

	if (!conn) {
		console.log("Connection Error");
		throw new Error("Connection Error");
	}

	const Entries = mongoose.models.Entries || mongoose.model("Entry", EntrySchema, DB_COLLECTION);

	return { conn, Entries };
};
