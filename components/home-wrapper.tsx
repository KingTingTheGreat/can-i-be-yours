"use client";
import { useState, useEffect } from "react";
import generateKey from "@/utils/generateKey";

const recommendations = ["partner", "girlfriend", "boyfriend", "valentine", "enemy"];

const HomeWrapper = () => {
	const [key, setKey] = useState("");
	useEffect(() => {
		setKey(generateKey());
	}, []);
	const [title, setTitle] = useState("partner");
	const [y, setY] = useState(true);
	const [name, setName] = useState("");
	const [sendUrl, setSendUrl] = useState("");
	const [checkUrl, setCheckUrl] = useState("");
	const [copiedSend, setCopiedSend] = useState(false);
	const [copiedCheck, setCopiedCheck] = useState(false);

	// yours or mine element
	const YElement = ({ yOption }: { yOption: boolean }) => {
		const yText = yOption ? "Can I be your..." : "Will you be my...";
		return (
			<div
				className={`rounded-md  p-2 m-2 cursor-pointer ${y === yOption ? "bg-red-100" : "bg-gray-100"}`}
				onClick={() => setY(yOption)}>
				<h5>{yText}</h5>
			</div>
		);
	};

	// recommendation element
	const RecElement = ({ rec }: { rec: string }) => {
		return (
			<main
				className={`rounded-md bg-gray-100 p-2 m-2 cursor-pointer capitalize ${
					rec === title ? "bg-red-100" : "bg-gray-100"
				}`}
				onClick={() => setTitle(rec)}>
				<h5>{rec}</h5>
			</main>
		);
	};

	// sends the entry to the database
	const sendToDB = async () => {
		const entry = { key, title, y, name };
		console.log(entry);
		await fetch("/api/createEntry", {
			method: "POST",
			headers: {
				key: key,
				title: title,
				y: y.toString(),
				name: name,
			},
		});
	};

	// resets fields and generates a new key
	const resetFields = () => {
		setTitle("partner");
		setY(true);
		setName("");
		setCopiedSend(false);
		setCopiedCheck(false);
		setKey(generateKey());
	};

	// updates the sendUrl when the key changes
	useEffect(() => {
		setSendUrl(encodeURI(`${window.location.origin}/${key}`));
		setCheckUrl(encodeURI(`${window.location.origin}/check?key=${key}`));
	}, [key]);

	return (
		<main className="flex justify-center items-center">
			<div className="flex flex-col w-[90%] lg:w-[50%]">
				<div id="question-container">
					<h4>Question:</h4>
					<div className="flex flex-wrap">
						{[true, false].map((yOption) => (
							<YElement key={yOption ? "y" : "m"} yOption={yOption} />
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
						navigator.clipboard.writeText(sendUrl);
						setCopiedCheck(false);
						setCopiedSend(true);
						sendToDB();
					}}
					className="cursor-pointer">
					<h4 className="text-xl">
						{!copiedSend ? `Send this URL to your recipient: ${sendUrl}` : `Copied to clipboard!`}
					</h4>
				</div>
				<div
					onClick={() => {
						navigator.clipboard.writeText(checkUrl);
						setCopiedSend(false);
						setCopiedCheck(true);
						sendToDB();
					}}
					className="cursor-pointer">
					<h4 className="text-xl">
						{!copiedCheck ? `Use this URL to check their response: ${checkUrl}` : `Copied to clipboard!`}
					</h4>
				</div>
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
