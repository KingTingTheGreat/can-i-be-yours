import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Can I Be Yours?",
	description: "Ask out that special someone!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={"min-h-screen"}>{children}</body>
		</html>
	);
}
