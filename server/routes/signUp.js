const { Router } = require('express');
const { isPwLongEnough, isEmail, authMw } = require('../middlewares/middlewares.js');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

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

router.post('/', [isEmail, isPwLongEnough], (request, response) => {
	let email = request.body.email;
	let username = request.body.username;
	let pw = request.body.pw;
	let encryptedPw = bcrypt.hashSync(pw, 10);

	pool
		.query('INSERT INTO users (email, username, pw) VALUES ($1, $2, $3) RETURNING *', [email, username, encryptedPw])
		.then((res) => {
			response.status(200).json({ msg: 'User successfully created' });
		})
		.catch((err) => {
			console.log(err);
			if ((err.code = '23505')) {
				response.status(403).json({ msg: 'User already exists' });
			} else {
				response.status(401).json({ msg: 'Failed to create user' });
			}
		});
});

module.exports = router;
