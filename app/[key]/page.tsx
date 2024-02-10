"use client";
import React from "react";
import { useParams } from "next/navigation";
import QuestionPage from "@/components/question-page";
import { redirect } from "next/navigation";

const ReceiverPage = async () => {
	const params = useParams<{ key: string }>();

	const res = await fetch(`https://canibeyours.com/api/getEntry?key=${params.key}`);
	if (!res.ok) {
		console.log("Failed to fetch");
		redirect("/");
	}
	const data = await res.json();

	return (
		<main>
			<QuestionPage data={data} />
		</main>
	);
};

export default ReceiverPage;
