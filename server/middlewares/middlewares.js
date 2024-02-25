const jwt = require('jsonwebtoken');

function isPwLongEnough(req, res, next) {
	let pw = req.body.pw;

	if (pw.length >= 6) {
		next();
	} else {
		res.status(403).json({ msg: 'The length of password should be at least 6 characters.' });
	}
}

function isEmail(req, res, next) {
	let email = req.body.email;
	let at = '@';
	let dot = '.';

	if (email.includes(at) && email.includes(dot)) {
		next();
	} else {
		res.status(403).json({ msg: 'Your email format is not valid' });
	}
}

function authMw(request, response, next) {
	let token = request.headers['x-auth-token'];

	if (token) {
		jwt.verify(token, 'nomoresecret', (err, decodedToken) => {
			if (decodedToken) {
				request.userId = decodedToken.id;
				next();
			} else {
				response.status(401).json({ msg: 'Token is not valid' });
			}
		});
	} else {
		response.status(401).json({ msg: 'No token found' });
	}
}

module.exports = {
	isPwLongEnough,
	isEmail,
	authMw,
};
