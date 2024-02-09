import { NextRequest, NextResponse } from "next/server";
import { entryDBConnect } from "@/utils/connection";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
	const key = request.nextUrl.searchParams.get("key") as string;
	const db = await entryDBConnect();
	const entry = await db.Entry.find({ key }).exec();
	if (entry.length === 0) {
		return NextResponse.json({ error: "Entry not found" }, { status: 404 });
	} else if (entry.length > 1) {
		return NextResponse.json({ error: "Multiple entries found" }, { status: 500 });
	}
	return NextResponse.json(entry[0]);
}
