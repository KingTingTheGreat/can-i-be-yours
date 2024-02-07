"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import QuestionPage from "@/components/question-page";

const TitlePage = () => {
	const params = useParams<{ title: string }>();
	const title = decodeURI(params.title);

	const searchParams = useSearchParams();
	const name = decodeURI(searchParams.get("name") ?? "");
	const q = decodeURI(searchParams.get("q") ?? "");

	if (q === "") {
		redirect("/");
	}

	if (q !== "m" && q !== "y") {
		redirect("/");
	}

	return (
		<main>
			<QuestionPage q={q} title={title} name={name} />
		</main>
	);
};

export default TitlePage;
