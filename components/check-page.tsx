"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CheckQuestion from "./check-question";
import { redirect } from "next/navigation";
import useSWR from 'swr';
import { URL } from "@/url"

const CheckPage = () => {
	const key = useSearchParams().get("key") as string;

	const res = useSWR(`${URL}/api/getEntry?key=${key}&checker=true`, (url) => fetch(url).then(res => res.json()))
	if (res.error) {
		console.log("Failed to fetch");
		redirect("/");
	}
	const data = res.data;

	if (!data) return <div>loading...</div>

	return <CheckQuestion data={data} />;
};

export default CheckPage;
