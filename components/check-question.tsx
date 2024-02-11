"use client";
import Loading from "./loading";
import { useState, useEffect } from "react";

const ResponseWrapper = ({ children }: { children: React.ReactNode }) => {
	return <h2 className="text-2xl">{children}</h2>;
};

const CheckQuestion = ({
	data,
}: {
	data: { title: string; y: boolean; name: string; opened: boolean; answer: boolean | null };
}) => {
	const [y, setY] = useState(true);
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const [opened, setOpened] = useState(false);
	const [answer, setAnswer] = useState<null | boolean>(null);

	useEffect(() => {
		setTitle(data.title);
		setY(data.y);
		setName(data.name);
		setOpened(data.opened);
		setAnswer(data.answer);
	}, [data]);

	const getName = () => {
		return <span className="font-medium">{name !== "" ? name : "Your recipient"}</span>;
	};

	const Response = () => {
		if (!opened) {
			return <ResponseWrapper>{getName()} has not opened your message yet.</ResponseWrapper>;
		} else if (answer === null) {
			return <ResponseWrapper>{getName()} has opened your message and is thinking it over.</ResponseWrapper>;
		} else if (y) {
			if (answer) {
				return (
					<ResponseWrapper>
						{getName()} would like you to be their {title}!
					</ResponseWrapper>
				);
			} else {
				return (
					<ResponseWrapper>
						{getName()} does not want you to be their {title}... 😢
					</ResponseWrapper>
				);
			}
		} else {
			if (answer) {
				return (
					<ResponseWrapper>
						{getName()} would like to be your {title}!
					</ResponseWrapper>
				);
			} else {
				return (
					<ResponseWrapper>
						{getName()} does not want to be your {title}... 😢
					</ResponseWrapper>
				);
			}
		}
	};

	return <div className="flex flex-col justify-center items-center">{title ? <Response /> : <Loading />}</div>;
};

export default CheckQuestion;
