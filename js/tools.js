function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUrlParameter(parameterToSearch) {
	let parameters = window.location.search.substring(1).split("&");
	let returnValue = undefined;
	for (let i = 0; i < parameters.length; i++) {
		let parameterAndValue = parameters[i].split("=");
		if (parameterAndValue[0] == parameterToSearch) {
			return parameterAndValue[1];
		}
	}
	return undefined;
}