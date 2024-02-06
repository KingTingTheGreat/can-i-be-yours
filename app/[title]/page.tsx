"use client";
import React, { FC } from "react";
import { redirect } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import YesBox from "@/components/yes-box";
import NoBox from "@/components/no-box";
import QuestionMine from "@/components/question-mine";
import QuestionYour from "@/components/question-your";

const TitlePage = () => {
	const params = useParams<{ title: string }>();
	const title = params.title;

	const searchParams = useSearchParams();
	const name = searchParams.get("name");
	const rel = searchParams.get("rel");

	if (rel === null) {
		redirect("/");
	}

	if (rel !== "m" && rel !== "y") {
		redirect("/");
	}

	// if (typeof title !== "string" || typeof name !== "string") {
	// 	redirect("/");
	// }

	return (
		<div>
			{rel === "m" ? <QuestionMine title={title} name={name} /> : <QuestionYour title={title} name={name} />}
			<YesBox />
			<NoBox />
		</div>
	);
};

export default TitlePage;
