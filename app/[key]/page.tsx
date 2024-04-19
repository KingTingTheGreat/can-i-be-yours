"use client";
import React from "react";
import { useParams } from "next/navigation";
import QuestionPage from "@/components/question-page";
import { redirect } from "next/navigation";
import useSWR from "swr";
import Loading from "@/components/loading";
import {URL} from "@/url";

const ReceiverPage = () => {
	const params = useParams<{ key: string }>();

	const res = useSWR(`${URL}/api/getEntry?key=${params.key}`, (url) => fetch(url).then((res) => res.json()));
	if (res.error) {
		console.log("Failed to fetch");
		redirect("/");
	}

	if (res.isLoading) return <Loading />;

	const data = res.data;

	if (!data || data.error) redirect("/");

	const UpdateYes = () => {
		console.log("you said yes!");
		fetch(`${URL}/api/updateEntry`, {
			method: "POST",
			headers: {
				key: params.key,
				answer: "true",
			},
		})
			.then((res) => res.ok)
			.then((ok) => {
				if (ok) {
					console.log("Successfully updated entry");
				} else {
					throw new Error("failed to update entry");
				}
			})
			.catch((err) => console.error(err));
	};

	const UpdateNo = () => {
		console.log("you said no :(");
		fetch(`${URL}/api/updateEntry`, {
			method: "POST",
			headers: {
				key: params.key,
				answer: "false",
			},
		})
			.then((res) => res.ok)
			.then((ok) => {
				if (ok) {
					console.log("Successfully updated entry");
				} else {
					throw new Error("failed to update entry");
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<main>
			<QuestionPage data={data} updateYes={UpdateYes} updateNo={UpdateNo} />
		</main>
	);
};

export default ReceiverPage;
