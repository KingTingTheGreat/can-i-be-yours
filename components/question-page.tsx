import AnswerBox from "./answer-box";
import Loading from "./loading";
import Question from "./question";
import { useState } from "react";

const QuestionPage = ({ q, title, name }: { q: string; title: string; name: string }) => {
	const [numNo, setNumNo] = useState(0);

	return (
		<div className="flex flex-col justify-center items-center">
			{title ? (
				<>
					<Question q={q} title={title} name={name} />
					<div className="flex">
						<AnswerBox answer="yes" numNo={numNo} incNo={null} />
						<AnswerBox answer="no" numNo={numNo} incNo={() => setNumNo(numNo + 1)} />
					</div>

					<p className="select-none"># of times you said no: {numNo}</p>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default QuestionPage;
