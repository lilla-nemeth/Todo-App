const { Router } = require('express');
const { isPwLongEnough, isEmail, authMw } = require('../middlewares/middlewares.js');
const { Pool } = require('pg');

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

router.get('/todos', authMw, (request, response) => {
	let userId = request.userId;

	pool
		.query('SELECT * FROM todos WHERE userId=$1', [userId])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch all todos' }));
});

router.get('/todos/:id', authMw, (request, response) => {
	let id = request.params.id;

	pool
		.query('SELECT * FROM todos WHERE id=$1', [id])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch todos by id' }));
});

router.post('/todos', authMw, (request, response) => {
	let title = request.body.title;
	let userId = request.userId;

	pool
		.query('INSERT INTO todos(title, userId) VALUES ($1, $2) RETURNING *', [title, userId])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to add a new todo' }));
});

router.delete('/todos/:id', authMw, (request, response) => {
	let id = request.params.id;

	pool
		.query('DELETE FROM todos WHERE id=$1', [id])
		.then((res) => response.status(200).json({ msg: 'Todo is successfully deleted' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to delete the todo' }));
});

router.delete('/todos', authMw, (request, response) => {
	let userId = request.userId;

	pool
		.query('DELETE FROM todos WHERE userId=$1', [userId])
		.then((res) => response.status(200).json({ msg: 'All todos are successfully deleted' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to delete all todos' }));
});

router.put('/todos/:id', authMw, (request, response) => {
	let id = request.params.id;
	let title = request.body.title;
	let completed = request.body.completed;
	let importance = request.body.importance;

	pool
		.query('UPDATE todos SET title=$1, completed=$2, importance=$3 WHERE id=$4', [title, completed, importance, id])
		.then((res) => response.status(200).json({ msg: 'Todo is successfully updated' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to update the todo' }));
});

module.exports = router;
