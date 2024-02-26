const { Router } = require('express');
const { isPwLongEnough, isEmail, authMw } = require('../middlewares/middlewares.js');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

const devSettings = {
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE,
};

const prodSettings = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: process.env.NODE_ENV === 'production' ? false : true,
	},
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? prodSettings : devSettings);

router.post('/', [isEmail], (request, response) => {
	let email = request.body.email;
	let pw = request.body.pw;

	pool
		.query('SELECT * FROM users WHERE email=$1', [email])
		.then((res) => {
			let encryptedPw = res.rows[0].pw;
			res.rows &&
				bcrypt.compare(pw, encryptedPw).then((isMatch) => {
					if (isMatch === true) {
						jwt.sign({ id: res.rows[0].id }, 'nomoresecret', (err, token) => {
							let currentUser = {};

							currentUser.token = token;
							response.status(200).json(currentUser);
						});
					} else {
						response.status(403).json({ msg: "Passwords don't match" });
					}
				});
		})
		.catch((err) => {
			console.log(err);
			response.status(400).json({ msg: 'User not found' });
		});
});

module.exports = router;
