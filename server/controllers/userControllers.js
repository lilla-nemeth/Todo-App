const pool = require('../config/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
	const email = request.body.email;
	const pw = request.body.pw;

	try {
		const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
		const encryptedPw = res.rows[0].pw;
		const isMatch = await bcrypt.compare(pw, encryptedPw);

		if (isMatch) {
			const token = jwt.sign({ id: res.rows[0].id }, 'nomoresecret');
			const currentUser = { token };
			response.status(200).json(currentUser);
		} else {
			response.status(403).json({ msg: "Passwords don't match" });
		}
	} catch (error) {
		console.log(error);
		response.status(400).json({ msg: 'User not found' });
	}
};

const signUp = async (request, response) => {
	const email = request.body.email;
	const username = request.body.username;
	const pw = request.body.pw;
	const encryptedPw = await bcrypt.hash(pw, 10);

	try {
		await pool.query('INSERT INTO users (email, username, pw) VALUES ($1, $2, $3) RETURNING *', [email, username, encryptedPw]);
		response.status(200).json({ msg: 'User successfully created' });
	} catch (error) {
		console.log(error);
		if (error.code === '23505') {
			response.status(403).json({ msg: 'User already exists' });
		} else {
			response.status(401).json({ msg: 'Failed to create user' });
		}
	}
};

module.exports = { login, signUp };
