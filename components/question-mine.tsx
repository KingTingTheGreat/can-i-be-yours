const QuestionMine = ({ title, name }: { title: string; name: string | null }) => {
	return (
		<div>
			<h2>{name ? `${name}, will you be my ${title}?` : `Will you be my ${title}?`}</h2>
		</div>
	);
};

export default QuestionMine;
