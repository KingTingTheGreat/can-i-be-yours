"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const recommendations = ["partner", "girlfriend", "boyfriend", "valentine", "enemy"];

const HomeWrapper = () => {
	const [title, setTitle] = useState("partner");
	const [rel, setRel] = useState("y");
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [copied, setCopied] = useState(false);

	const RelElement = ({ relOption }: { relOption: string }) => {
		const relText = relOption === "m" ? "mine" : "yours";
		return (
			<div
				className={`rounded-md  p-2 m-2 cursor-pointer capitalize ${
					rel === relOption ? "bg-red-100" : "bg-gray-100"
				}`}
				onClick={() => setRel(relOption)}>
				<h5>{relText}</h5>
			</div>
		);
	};

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

	useEffect(() => {
		setUrl(encodeURI(`${window.location.origin}/${title}?rel=${rel}` + (name !== "" ? `&name=${name}` : "")));
		setCopied(false);
	}, [title, rel, name]);

	return (
		<main className="flex justify-center items-center">
			<div className="flex flex-col w-[90%] lg:w-[50%]">
				<div id="rel-container">
					<h4>Rel:</h4>
					<div className="flex flex-wrap">
						{["y", "m"].map((relOption) => (
							<RelElement key={relOption} relOption={relOption} />
						))}
					</div>
				</div>
				<div id="title-container">
					<h4>Recommended titles:</h4>
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
					}}
					className="cursor-pointer">
					<h4 className="text-xl">{!copied ? `Click to copy URL : ${url}` : `Copied to clipboard!`}</h4>
				</div>
			</div>
		</main>
	);
};

export default HomeWrapper;
