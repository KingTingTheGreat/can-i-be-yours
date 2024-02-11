import React, { Suspense } from "react";
import CheckPage from "@/components/check-page";

const SenderPage = () => {
	return (
		<main>
			<Suspense>
				<CheckPage />
			</Suspense>
		</main>
	);
};

export default SenderPage;
