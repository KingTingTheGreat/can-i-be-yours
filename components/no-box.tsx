const NoBox = ({ incNo }: { incNo: any }) => {
	return (
		<div className="bg-red-300" onClick={incNo}>
			<h3>No</h3>
		</div>
	);
};

export default NoBox;
