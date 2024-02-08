const generateKey = () => {
	const timestamp = new Date().getTime().toString(36);
	const randomPart = Math.random().toString(36).substring(2);
	return timestamp + randomPart;
};

export default generateKey;
