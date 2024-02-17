"use client";
import React from "react";
import { useParams } from "next/navigation";
import QuestionPage from "@/components/question-page";
import { redirect } from "next/navigation";
import useSWR from "swr";
import Loading from "@/components/loading";

const url = 'https://canibeyours.com';

const ReceiverPage = () => {
	const params = useParams<{ key: string }>();

	const res = useSWR(`${url}/api/getEntry?key=${params.key}`, (url) =>
		fetch(url).then((res) => res.json())
	);
	if (res.error) {
		console.log("Failed to fetch");
		redirect("/");
	}
	
	if (res.isLoading) return <Loading />

	const data = res.data;

	const UpdateYes = () => {
		console.log("you said yes!");
		const res = useSWR(`${url}/api/updatEntry`, (url) =>
			fetch(url, {
				method: "POST",
				headers: {
					key: params.key,
					answer: "true",
				},
			}).then((res) => res.json())
		);
		if (res.error) {
			console.log("Failed to update");
		}
	};

	const UpdateNo = () => {
		console.log("you said no :(");
		const res = useSWR(`${url}/api/updateEntry`, (url) => 
		fetch(url, {
			method: "POST",
			headers: {
				key: params.key,
				answer: "false",
			},
		}));
		if (res.error) {
			console.log("Failed to update");
		}
	};

	return (
		<main>
			<QuestionPage data={data} updateYes={UpdateYes} updateNo={UpdateNo} />
		</main>
	);
};

export default ReceiverPage;
