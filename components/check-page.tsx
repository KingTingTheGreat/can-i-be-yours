"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CheckQuestion from "./check-question";
import { redirect } from "next/navigation";

const CheckPage = async () => {
	const key = useSearchParams().get("key") as string;

	const res = await fetch(`https://canibeyours.com/api/getEntry?key=${key}&checker=true`);
	if (!res.ok) {
		console.log("Failed to fetch");
		redirect("/");
	}
	const data = await res.json();

	return <CheckQuestion data={data} />;
};

export default CheckPage;
