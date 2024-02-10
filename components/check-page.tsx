"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import QuestionPage from "@/components/question-page";
import { redirect } from "next/navigation";

const CheckPage = async () => {
	const key = useSearchParams().get("key") as string;

	const res = await fetch(`https://canibeyours.com/api/getEntry?key=${key}`);
	if (!res.ok) {
		console.log("Failed to fetch");
		redirect("/");
	}
	const data = await res.json();

	return <QuestionPage data={data} />;
};

export default CheckPage;
