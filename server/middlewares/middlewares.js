const jwt = require('jsonwebtoken');

const isPwLongEnough = (req, res, next) => {
	const pw = req.body.pw;

	if (pw.length >= 6) {
		next();
	} else {
		res.status(403).json({ msg: 'The length of password should be at least 6 characters.' });
	}
};

const isEmail = (req, res, next) => {
	const email = req.body.email;
	const at = '@';
	const dot = '.';

	if (email.includes(at) && email.includes(dot)) {
		next();
	} else {
		res.status(403).json({ msg: 'Your email format is not valid' });
	}
};

const authMw = (request, response, next) => {
	const token = request.headers['x-auth-token'];

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
};

module.exports = {
	isPwLongEnough,
	isEmail,
	authMw,
};
