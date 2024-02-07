import YesBox from "./yes-box";
import NoBox from "./no-box";
import Question from "./question";
import { useState } from "react";

const QuestionPage = ({ q, title, name }: { q: string; title: string; name: string }) => {
	const [numNo, setNumNo] = useState(0);

	return (
		<div>
			<Question q={q} title={title} name={name} />
			<YesBox />
			<NoBox incNo={() => setNumNo(numNo + 1)} />
			<p>Number of people who said no: {numNo}</p>
		</div>
	);
};

export default QuestionPage;
