import { entryDBConnect } from "./connection";

const getEntry = async ({ key }: { key: string }) => {
	const db = await entryDBConnect();
	const entry = await db.Entries.find({ key });
	return entry;
};

export default getEntry;
