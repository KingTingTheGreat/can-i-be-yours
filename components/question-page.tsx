import AnswerBox from "./answer-box";
import Question from "./question";
import { useState } from "react";

const QuestionPage = ({ q, title, name }: { q: string; title: string; name: string }) => {
	const [numNo, setNumNo] = useState(0);

	return (
		<div className="flex flex-col justify-center items-center">
			<Question q={q} title={title} name={name} />
			<div className="flex">
				<AnswerBox answer="yes" numNo={numNo} incNo={null} />
				<AnswerBox answer="no" numNo={numNo} incNo={() => setNumNo(numNo + 1)} />
			</div>

			<p># of times you said no: {numNo}</p>
		</div>
	);
};

export default QuestionPage;
