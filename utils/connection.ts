//IMPORT MONGOOSE
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION;

// connection function
export const entryDBConnect = async () => {
	const EntrySchema = new mongoose.Schema({
		key: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: "",
		},
		q: {
			type: String,
			default: "",
		},
		name: {
			type: String,
			default: "",
		},
	});

	const conn = await mongoose.connect(MONGODB_URL as string).catch((err) => console.log(err));

	if (!conn) {
		console.log("Connection Error");
		throw new Error("Connection Error");
	}

	const Entry = mongoose.models.Entry || mongoose.model("Entry", EntrySchema, DB_COLLECTION);

	return { conn, Entry };
};
