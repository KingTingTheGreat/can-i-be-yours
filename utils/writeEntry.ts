import { entryDBConnect } from "./connection";

const writeEntry = async ({ key, title, q, name }: { key: string; title: string; q: string; name: string }) => {
	console.log("writing to database");
	const db = await entryDBConnect();
	const entry = await db.Entry.create({ key, title, q, name });
	console.log({ key, title, q, name });
	console.log("finished writing to database");
	return true;
};

export default writeEntry;
