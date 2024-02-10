// "use client";
import React, { Suspense } from "react";
// import { redirect } from "next/navigation";
// import { useSearchParams } from "next/navigation";
import CheckPage from "@/components/check-page";

const SenderPage = () => {
	// const searchParams = useSearchParams();
	// const key = searchParams.get("key") as string;

	// const res = await fetch(`https://canibeyours.com/api/getEntry?key=${key}`);
	// if (!res.ok) {
	// 	console.log("Failed to fetch");
	// 	redirect("/");
	// }
	// const data = await res.json();

	return (
		<main>
			<Suspense>
				<CheckPage />
			</Suspense>
		</main>
	);
};

export default SenderPage;
