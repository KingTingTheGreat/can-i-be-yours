"use client";
import AnswerBox from "./answer-box";
import Loading from "./loading";
import Question from "./question";
import { useState, useEffect } from "react";

const CheckPage = ({ data }: { data: { title: string; y: boolean; name: string } }) => {
	const [numNo, setNumNo] = useState(0);
	const [y, setY] = useState(true);
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		setTitle(data.title);
		setY(data.y);
		setName(data.name);
	}, [data]);

	return (
		<div className="flex flex-col justify-center items-center">
			{title ? (
				<>
					<Question y={y} title={title} name={name} />
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

export default CheckPage;
