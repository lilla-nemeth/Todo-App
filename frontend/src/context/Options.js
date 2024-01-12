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
