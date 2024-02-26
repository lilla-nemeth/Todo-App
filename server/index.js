const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const { isPwLongEnough, isEmail, authMw } = require('./middlewares/middlewares.js');
const todosRouter = require('./routes/todoList.js');
const loginRouter = require('./routes/login.js');
const signUpRouter = require('./routes/signUp.js');

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

app.use('/', todosRouter);

app.use('/login', loginRouter);

app.use('/signup', signUpRouter);

app.get('/user', authMw, (request, response) => {
	let id = request.userId;

	pool
		.query('SELECT * FROM users WHERE id=$1', [id])
		.then((res) => response.status(200).json(res.rows[0].username))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch user' }));
});

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = app;
