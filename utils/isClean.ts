const allowedChars = /^[a-zA-Z0-9\s\.,\-\_\(\):;]*$/;

const isClean = (input: string) => {
	return allowedChars.test(input);
};

export default isClean;
