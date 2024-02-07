import { AnyNaptrRecord } from "dns";

const AnswerBox = ({ answer, numNo, incNo }: { answer: string; numNo: number; incNo: any }) => {
	const textColor = () => {
		return answer === "yes" ? "bg-green-300" : "bg-red-300";
	};
	const textSize = () => {
		return numNo > 0 ? "text-3xl" : "text-3xl";
	};
	return (
		<div className={`cursor-pointer p-1 m-1 w-20 text-center ${textSize()} ${textColor()}`} onClick={incNo}>
			<h3 className="select-none">{answer}</h3>
		</div>
	);
};

export default AnswerBox;
