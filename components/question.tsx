const QuestionWrapper = ({ children }: { children: React.ReactNode }) => {
	return <h2 className="text-2xl">{children}</h2>;
};

const Question = ({ y, title, name }: { y: boolean; title: string; name: string }) => {
	const getName = () => {
		return <span className="font-medium">{name}</span>;
	};
	if (y) {
		return name !== "" ? (
			<QuestionWrapper>
				{getName()}, can I be your {title}
			</QuestionWrapper>
		) : (
			<QuestionWrapper>Can I be your {title}?</QuestionWrapper>
		);
	} else {
		return name !== "" ? (
			<QuestionWrapper>
				{getName()}, will you be my {title}?
			</QuestionWrapper>
		) : (
			<QuestionWrapper>Will you be my {title}?</QuestionWrapper>
		);
	}
};

export default Question;
