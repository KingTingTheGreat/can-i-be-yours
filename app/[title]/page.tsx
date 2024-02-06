"use client";
import React, { FC } from "react";
import { redirect } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import QuestionMine from "@/components/question-mine";
import QuestionYour from "@/components/question-your";

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
		<div>{q === "m" ? <QuestionMine title={title} name={name} /> : <QuestionYour title={title} name={name} />}</div>
	);
};

export default TitlePage;
