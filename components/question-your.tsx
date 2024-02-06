const QuestionYour = ({ title, name }: { title: string; name: string | null }) => {
	return (
		<div>
			<h2>{name ? `${name}, can I be your ${title}?` : `Can I be your ${title}?`}</h2>
		</div>
	);
};

export default QuestionYour;
