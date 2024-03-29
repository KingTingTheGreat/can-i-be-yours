import { NextRequest, NextResponse } from "next/server";
import { entryDBConnect } from "@/utils/connection";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
	const key = request.nextUrl.searchParams.get("key") as string;
	const checker = (request.nextUrl.searchParams.get("checker") as string) === "true";
	const db = await entryDBConnect();
	const entries = await db.Entry.find({ key }).exec();
	if (entries.length === 0) {
		return NextResponse.json({ error: "Entry not found" }, { status: 404 });
	} else if (entries.length > 1) {
		return NextResponse.json({ error: "Multiple entries found" }, { status: 500 });
	}
	let entry = entries[0];
	if (!checker) {
		// update opened to true
		entry.opened = true;
		await entry.save();
	}
	return NextResponse.json(entry);
}
