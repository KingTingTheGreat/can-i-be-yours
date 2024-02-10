"use client";
import { useState, useEffect } from "react";
import writeEntry from "@/utils/writeEntry";
import generateKey from "@/utils/generateKey";

const recommendations = ["partner", "girlfriend", "boyfriend", "valentine", "enemy"];

const HomeWrapper = () => {
	const [key, setKey] = useState("");
	useEffect(() => {
		setKey(generateKey());
	}, []);
	const [title, setTitle] = useState("partner");
	const [q, setQ] = useState("y");
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [copied, setCopied] = useState(false);

	// question element
	const QElement = ({ qOption }: { qOption: string }) => {
		const qText = qOption === "m" ? "Will you be my..." : "Can I be your...";
		return (
			<div
				className={`rounded-md  p-2 m-2 cursor-pointer ${q === qOption ? "bg-red-100" : "bg-gray-100"}`}
				onClick={() => setQ(qOption)}>
				<h5>{qText}</h5>
			</div>
		);
	};

	// recommendation element
	const RecElement = ({ rec }: { rec: string }) => {
		return (
			<div
				className={`rounded-md bg-gray-100 p-2 m-2 cursor-pointer capitalize ${
					rec === title ? "bg-red-100" : "bg-gray-100"
				}`}
				onClick={() => setTitle(rec)}>
				<h5>{rec}</h5>
			</div>
		);
	};

	// sends the entry to the database
	const sendToDB = async () => {
		const entry = { key, title, q, name };
		console.log(entry);
		await fetch("/api/writeEntry", {
			method: "POST",
			headers: {
				key: key,
				title: title,
				q: q,
				name: name,
			},
		});
	};

	// resets fields and generates a new key
	const resetFields = () => {
		setTitle("partner");
		setQ("y");
		setName("");
		setCopied(false);
		setKey(generateKey());
	};

	// updates the url when the key changes
	useEffect(() => {
		setUrl(encodeURI(`${window.location.origin}/${key}`));
	}, [key]);

	return (
		<main className="flex justify-center items-center">
			<div className="flex flex-col w-[90%] lg:w-[50%]">
				<div id="question-container">
					<h4>Question:</h4>
					<div className="flex flex-wrap">
						{["y", "m"].map((qOption) => (
							<QElement key={qOption} qOption={qOption} />
						))}
					</div>
				</div>
				<div id="title-container">
					<h4>Popular titles:</h4>
					<div className="flex flex-wrap">
						{recommendations.map((rec) => (
							<RecElement key={rec} rec={rec} />
						))}
					</div>
					<input
						type="text"
						className="m-2"
						value={title}
						placeholder="Title (required)"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div id="name-container">
					<h4>Name:</h4>
					<input
						type="text"
						className="m-2"
						value={name}
						placeholder="Name (optional)"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div
					onClick={() => {
						navigator.clipboard.writeText(url);
						setCopied(true);
						sendToDB();
					}}
					className="cursor-pointer">
					<h4 className="text-xl">{!copied ? `Click to copy URL : ${url}` : `Copied to clipboard!`}</h4>
				</div>
				<p>Here is your key: {key}</p>
				<div
					onClick={() => resetFields()}
					className="cursor-pointer bg-red-400 w-24 text-center rounded-lg p-2">
					Make a new link
				</div>
			</div>
		</main>
	);
};

export default HomeWrapper;
