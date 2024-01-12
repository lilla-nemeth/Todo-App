// Strings:
// method - requestMethod
// url - endpoint
// mode
// appJson - application/json

// Object with key-value pairs:
// data - dataObject
export function createOptionsWithData(requestMethod, endpoint, mode, appJson, dataObject) {
	const options = {
		method: requestMethod,
		url: endpoint,
		mode: mode,
		headers: {
			'Content-Type': appJson,
		},
		data: dataObject,
	};

	return options;
}

// String also:
// token - props.token
export function createOptionsWithToken(requestMethod, endpoint, mode, appJson, token) {
	const options = {
		method: requestMethod,
		url: endpoint,
		mode: mode,
		headers: {
			'Content-Type': appJson,
			'x-auth-token': token,
		},
	};

	return options;
}
