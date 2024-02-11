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

	const updateYes = async () => {
		const res = await fetch(`https://canibeyours.com/api/updateEntry`, {
			method: "POST",
			headers: {
				key: params.key,
				answer: "true",
			},
		});
		if (!res.ok) {
			console.log("Failed to update");
		}
	};

	const updateNo = async () => {
		const res = await fetch(`https://canibeyours.com/api/updateEntry`, {
			method: "POST",
			headers: {
				key: params.key,
				answer: "false",
			},
		});
		if (!res.ok) {
			console.log("Failed to update");
		}
	};

	return (
		<main>
			<QuestionPage data={data} updateYes={updateYes} updateNo={updateNo} />
		</main>
	);
};

export default ReceiverPage;
