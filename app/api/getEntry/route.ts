import { NextRequest, NextResponse } from "next/server";
import getEntry from "@/utils/getEntry";
import { entryDBConnect } from "@/utils/connection";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
	const key = request.nextUrl.searchParams.get("key") as string;
	const db = await entryDBConnect();
	const entry = await db.Entry.find({ key }).exec();
	return NextResponse.json(entry);
}
