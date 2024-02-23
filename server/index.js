const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const { isPwLongEnough, isEmail, authMw } = require('./middlewares/middlewares.js');

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

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

app.get('/todos', authMw, (request, response) => {
	let userId = request.userId;

	pool
		.query('SELECT * FROM todos WHERE userId=$1', [userId])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch all todos' }));
});

app.get('/todos/:id', authMw, (request, response) => {
	let id = request.params.id;

	pool
		.query('SELECT * FROM todos WHERE id=$1', [id])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch todos by id' }));
});

app.post('/todos', authMw, (request, response) => {
	let title = request.body.title;
	let userId = request.userId;

	pool
		.query('INSERT INTO todos(title, userId) VALUES ($1, $2) RETURNING *', [title, userId])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to add a new todo' }));
});

app.delete('/todos/:id', authMw, (request, response) => {
	let id = request.params.id;

	pool
		.query('DELETE FROM todos WHERE id=$1', [id])
		.then((res) => response.status(200).json({ msg: 'Todo is successfully deleted' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to delete the todo' }));
});

app.delete('/todos', authMw, (request, response) => {
	let userId = request.userId;

	pool
		.query('DELETE FROM todos WHERE userId=$1', [userId])
		.then((res) => response.status(200).json({ msg: 'All todos are successfully deleted' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to delete all todos' }));
});

app.put('/todos/:id', authMw, (request, response) => {
	let id = request.params.id;
	let title = request.body.title;
	let completed = request.body.completed;
	let importance = request.body.importance;

	pool
		.query('UPDATE todos SET title=$1, completed=$2, importance=$3 WHERE id=$4', [title, completed, importance, id])
		.then((res) => response.status(200).json({ msg: 'Todo is successfully updated' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to update the todo' }));
});

app.post('/signup', [isEmail, isPwLongEnough], (request, response) => {
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
			if ((err.code = '23505')) {
				response.status(403).json({ msg: 'User already exists' });
			} else {
				response.status(401).json({ msg: 'Failed to create user' });
			}
		});
});

app.post('/login', [isEmail], (request, response) => {
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
		.catch((err) => response.status(400).json({ msg: 'User not found' }));
});

app.get('/user', authMw, (request, response) => {
	let id = request.userId;

	pool
		.query('SELECT * FROM users WHERE id=$1', [id])
		.then((res) => response.status(200).json(res.rows[0].username))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch user' }));
});

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build/index.html'));
});

module.exports = {
	app,
};
