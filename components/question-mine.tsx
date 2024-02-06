import YesBox from "./yes-box";
import NoBox from "./no-box";
import { useState } from "react";

const QuestionMine = ({ title, name }: { title: string; name: string | null }) => {
	const [numNo, setNumNo] = useState(0);

	return (
		<div>
			<h2>{name ? `${name}, will you be my ${title}?` : `Will you be my ${title}?`}</h2>
			<YesBox />
			<NoBox incNo={() => setNumNo(numNo + 1)} />
			<p>Number of people who said no: {numNo}</p>
		</div>
	);
};

export default QuestionMine;
