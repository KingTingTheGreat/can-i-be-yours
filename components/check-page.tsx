"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CheckQuestion from "./check-question";
import { redirect } from "next/navigation";
import useSWR from 'swr';

const url = 'https://canibeyours.com'

const CheckPage = () => {
	const key = useSearchParams().get("key") as string;

	const res = useSWR(`${url}/api/getEntry?key=${key}&checker=true`, (url) => fetch(url).then(res => res.json()))
	if (res.error) {
		console.log("Failed to fetch");
		redirect("/");
	}
	const data = res.data;

	return <CheckQuestion data={data} />;
};

export default CheckPage;
