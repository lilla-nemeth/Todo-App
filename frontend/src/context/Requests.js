import axios from 'axios';
// options - createOptionsWithData function (object)
// successCb - success callback
// errorCb - error callback
export function changeOrGetData({ options, successCb, errorCb }) {
	axios(options)
		.then((res) => {
			if (res && successCb) successCb(res);
		})
		.catch((err) => {
			if (err && errorCb) errorCb(err);
		});
}
