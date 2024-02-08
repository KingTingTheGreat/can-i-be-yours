const AnswerBox = ({ answer, numNo, incNo }: { answer: string; numNo: number; incNo: any }) => {
	const bgColor = () => {
		return answer === "yes" ? "bg-green-300" : "bg-red-300";
	};
	const textSize = () => {
		return numNo > 0 ? "text-3xl" : "text-3xl";
	};
	const boxDims = () => {
		if (numNo <= 0) return `w-14 h-14`;
		if (numNo <= 2) return `w-16 h-16`;
		if (numNo <= 4) return `w-20 h-20`;
		if (numNo <= 6) return `w-24 h-24`;
		if (numNo <= 8) return `w-28 h-28`;
		if (numNo <= 10) return `w-32 h-32`;
		return `w-10 h-10`;
	};

	return (
		<div
			className={`cursor-pointer p-1 m-1 flex items-center justify-center transition-all ${textSize()} ${bgColor()} ${boxDims()}`}
			onClick={incNo}>
			<h3 className="select-none">{numNo}</h3>
		</div>
	);
};

export default AnswerBox;
