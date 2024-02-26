const { pool } = require('../config/db.js');

const login = async (request, response) => {
	const email = request.body.email;
	const pw = request.body.pw;

	await pool
		.query('SELECT * FROM users WHERE email=$1', [email])
		.then((res) => {
			const encryptedPw = res.rows[0].pw;
			res.rows &&
				bcrypt.compare(pw, encryptedPw).then((isMatch) => {
					if (isMatch === true) {
						jwt.sign({ id: res.rows[0].id }, 'nomoresecret', (err, token) => {
							const currentUser = {};

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
};

const signUp = async (request, response) => {
	const email = request.body.email;
	const username = request.body.username;
	const pw = request.body.pw;
	const encryptedPw = bcrypt.hashSync(pw, 10);

	await pool
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
};

module.exports = { login, signUp };
