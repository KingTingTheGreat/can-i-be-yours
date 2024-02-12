const AnswerBox = ({ answer, numNo, incNo }: { answer: string; numNo: number; incNo: any }) => {
	const bgColor = () => {
		return answer === "yes" ? "bg-green-300" : "bg-red-300";
	};

	const boxDims = () => {
		if (answer === "yes") {
			if (numNo <= 0) return `w-20 h-20 text-3xl`;
			if (numNo <= 1) return `w-24 h-24 text-3xl`;
			if (numNo <= 2) return `w-28 h-28 text-4xl`;
			if (numNo <= 3) return `w-32 h-32 text-4xl`;
			if (numNo <= 4) return `w-36 h-36 text-5xl`;
			if (numNo <= 5) return `w-40 h-40 text-5xl`;
			if (numNo <= 6) return `w-44 h-44 text-6xl`;
			if (numNo <= 7) return `w-48 h-48 text-6xl`;
			if (numNo <= 8) return `w-52 h-52 text-7xl`;
			if (numNo <= 9) return `w-56 h-56 text-7xl`;
			if (numNo >= 10) return `w-60 h-60 text-8xl`;
		} else {
			if (numNo <= 0) return `w-20 h-20 text-3xl`;
			if (numNo <= 1) return `w-16 h-16 text-3xl`;
			if (numNo <= 2) return `w-14 h-14 text-2xl`;
			if (numNo <= 3) return `w-12 h-12 text-2xl`;
			if (numNo <= 4) return `w-11 h-11 text-xl`;
			if (numNo <= 5) return `w-10 h-10 text-xl`;
			if (numNo <= 6) return `w-9 h-9 text-lg`;
			if (numNo <= 7) return `w-8 h-8 text-lg`;
			if (numNo <= 8) return `w-7 h-7 text-md`;
			if (numNo <= 9) return `w-6 h-6 text-md`;
			if (numNo >= 10) return `w-5 h-5 text-sm`;
		}

		return `w-10 h-10`;
	};

	return (
		<div
			className={`cursor-pointer p-1 m-1 flex items-center justify-center transition-all ${bgColor()} ${boxDims()}`}
			onClick={incNo}>
			<h3 className="select-none capitalize">{answer}</h3>
		</div>
	);
};

export default AnswerBox;
