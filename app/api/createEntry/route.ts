import { NextRequest, NextResponse } from "next/server";
import { entryDBConnect } from "@/utils/connection";
import { headers } from "next/headers";
import isClean from "@/utils/isClean";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
	const headersList = headers();
	const key = headersList.get("key") as string;
	const title = headersList.get("title") as string;
	const yHeader = headersList.get("y") as string;
	const y = yHeader === "true";
	const name = headersList.get("name") as string;

	// check that key and title are present
	if (!key || !title) {
		console.log("Missing key or title");
		return NextResponse.json({ error: "Missing key or title" }, { status: 400 });
	}

	// check that key is only 0-9 and a-z
	if (!/^[0-9a-z]+$/.test(key)) {
		console.log("Unclean key");
		return NextResponse.json({ error: "Invalid key" }, { status: 400 });
	}

	// check that title, q, and name are clean
	if (!isClean(title) || !isClean(name)) {
		console.log("Unclean title or name");
		return NextResponse.json({ error: "Invalid title or name" }, { status: 400 });
	}

	// check title and name are 64 chars or less
	if (title.length > 64 || name.length > 64) {
		console.log("Invalid title or name");
		return NextResponse.json({ error: "Invalid title or name" }, { status: 400 });
	}

	const db = await entryDBConnect();

	// check that this key is unique
	const existing = await db.Entry.find({ key }).exec();
	if (existing.length > 0) {
		console.log("Trying to create a key that already exists");
		return NextResponse.json({ error: "Entry already exists" }, { status: 500 });
	}

	// create the new entry and save
	const newEntry = new db.Entry({ key, title, y, name, opened: false, answer: null });
	await newEntry.save();
	console.log("Saved new entry");

	// return the entry
	return NextResponse.json(newEntry);
}
