"use client";
import { redirect } from "next/navigation";
import AnswerBox from "./answer-box";
import Loading from "./loading";
import Question from "./question";
import { useState, useEffect } from "react";
import YesAnswered from "./yes-answered";

const QuestionPage = ({
	data,
	updateYes,
	updateNo,
}: {
	data: { title: string; y: boolean; name: string; answer: boolean | null };
	updateYes: any;
	updateNo: any;
}) => {
	const [numNo, setNumNo] = useState(0);
	const [y, setY] = useState(true);
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const [answer, setAnswer] = useState<null | boolean>(null);

	const [redir, setRedir] = useState(false);

	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setY(data.y);
			setName(data.name);
			setAnswer(data.answer);
		}
		}, [data]);

	const wrapperUpdateYes = () => {
		updateYes();
		setAnswer(true);
	};

	// wraps updateNo; only updates after 10 no's
	const wrapperUpdateNo = () => {
		if (numNo >= 10) {
			updateNo();
			setRedir(true);
		}
	};

	useEffect(() => {
		if (redir) {
			redirect("/");
		}
	}, [redir]);

	return (
		<div className="flex flex-col justify-center items-center">
			{answer ? (
				<YesAnswered />
				) : (
					<>
						<Question y={y} title={title} name={name} />
						<div className="flex">
							<div onClick={() => wrapperUpdateYes()}>
							<AnswerBox answer="yes" numNo={numNo} incNo={null} />
							</div>
							<div onClick={() => wrapperUpdateNo()}>
								<AnswerBox answer="no" numNo={numNo} incNo={() => setNumNo(numNo + 1)} />
							</div>
						</div>
					</>
			)}
		</div>
	);
};

export default QuestionPage;
