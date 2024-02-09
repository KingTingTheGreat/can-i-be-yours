"use client";
import React from "react";
import { useParams } from "next/navigation";
import QuestionPage from "@/components/question-page";
import { useState } from "react";

const ReceiverPage = () => {
	const params = useParams<{ key: string }>();

	const [title, setTitle] = useState("");
	const [q, setQ] = useState("");
	const [name, setName] = useState("");

	fetch(`http://localhost:3000/api/getEntry?key=${params.key}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			setTitle(data.title);
			setQ(data.q);
			setName(data.name);
		});

	return (
		<main>
			<QuestionPage q={q} title={title} name={name} />
		</main>
	);
};

export default ReceiverPage;
