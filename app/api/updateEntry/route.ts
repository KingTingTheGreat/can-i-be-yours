import { NextRequest, NextResponse } from "next/server";
import { entryDBConnect } from "@/utils/connection";
import { headers } from "next/headers";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
	const headersList = headers();
	const key = headersList.get("key") as string;
	const answer = headersList.get("answer") as string;

	// check that key and title are present
	if (!key || !answer) {
		console.log("Missing key or answer");
		return NextResponse.json({ error: "Missing key or answer" }, { status: 400 });
	}

	// check that key is only 0-9 and a-z
	if (!/^[0-9a-z]+$/.test(key)) {
		console.log("Unclean key");
		return NextResponse.json({ error: "Invalid key" }, { status: 400 });
	}

	// check that title, q, and name are clean
	if (answer !== "true" && answer !== "false") {
		console.log("Invalid answer");
		return NextResponse.json({ error: "Invalid answer" }, { status: 400 });
	}

	const db = await entryDBConnect();

	// check that this key is unique
	const existing = await db.Entry.find({ key }).exec();
	if (existing.length === 0) {
		console.log("Entry not found");
		return NextResponse.json({ error: "Entry not found" }, { status: 500 });
	} else if (existing.length > 1) {
		console.log("Multiple entries found");
		return NextResponse.json({ error: "Multiple entries found" }, { status: 500 });
	}

	// create the new entry and save
	const entry = existing[0];
	entry.answer = answer === "true";
	console.log(`Updated entry: ${entry.answer}`);
	await entry.save();

	// return the entry
	return NextResponse.json(entry);
}
