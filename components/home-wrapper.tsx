"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const recommendations = ["partner", "girlfriend", "boyfriend", "valentine", "enemy"];

const HomeWrapper = () => {
	const [title, setTitle] = useState("partner");
	const [rel, setRel] = useState("y");
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");

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
		setUrl(`${window.location.origin}/${title}?rel=${rel}` + (name !== "" ? `&name=${name}` : ""));
	}, [title, rel, name]);

	return (
		<main className="flex justify-center items-center">
			<div className="flex flex-col w-[80%] lg:w-[50%]">
				<div id="rel-container">
					<h4>Rel:</h4>
					<div className="flex flex-wrap">
						{["y", "m"].map((relOption) => (
							<RelElement key={relOption} relOption={relOption} />
						))}
					</div>
				</div>
				<div id="recommendation-container">
					<h4>Recommendations:</h4>
					<div className="flex flex-wrap">
						{recommendations.map((rec) => (
							<RecElement key={rec} rec={rec} />
						))}
					</div>
				</div>
				<input type="text" className="m-2" value={title} onChange={(e) => setTitle(e.target.value)} />
				<input
					type="text"
					className="m-2"
					value={name}
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
				/>
				<div onClick={() => navigator.clipboard.writeText(url)} className="cursor-pointer">
					<h4 className="text-xl">Copy URL: {url}</h4>
				</div>
			</div>
		</main>
	);
};

export default HomeWrapper;
