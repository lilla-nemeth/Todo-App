// Strings:
// method - requestMethod
// url - endpoint
// mode
// appJson - application/json

// token - (string | null)
// dataObject - dataObject (Object | null)
export function createOptions(requestMethod, endpoint, mode, appJson, token, dataObject) {
	const options = {
		method: requestMethod,
		url: endpoint,
		mode: mode,
		headers: {
			'Content-Type': appJson,
			'x-auth-token': token,
		},
		data: dataObject,
	};

	return options;
}
