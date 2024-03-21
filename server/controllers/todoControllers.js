const pool = require('../config/db.js');

const getAllTodos = async (request, response) => {
	const userId = request.userId;

	await pool
		.query('SELECT * FROM todos WHERE userId=$1', [userId])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch all todos' }));
};

const getTodo = async (request, response) => {
	const id = request.params.id;

	await pool
		.query('SELECT * FROM todos WHERE id=$1', [id])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to fetch todos by id' }));
};

const createTodo = async (request, response) => {
	const title = request.body.title;
	const userId = request.userId;

	await pool
		.query('INSERT INTO todos(title, userId) VALUES ($1, $2) RETURNING *', [title, userId])
		.then((res) => response.status(200).json(res.rows))
		.catch((err) => response.status(400).json({ msg: 'Failed to add a new todo' }));
};

const deleteTodo = async (request, response) => {
	const id = request.params.id;

	await pool
		.query('DELETE FROM todos WHERE id=$1', [id])
		.then((res) => response.status(200).json({ msg: 'Todo is successfully deleted' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to delete the todo' }));
};

const deleteAllTodos = async (request, response) => {
	const userId = request.userId;

	await pool
		.query('DELETE FROM todos WHERE userId=$1', [userId])
		.then((res) => response.status(200).json({ msg: 'All todos are successfully deleted' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to delete all todos' }));
};

const updateTodo = async (request, response) => {
	const id = request.params.id;
	const title = request.body.title;
	const completed = request.body.completed;
	const importance = request.body.importance;

	await pool
		.query('UPDATE todos SET title=$1, completed=$2, importance=$3 WHERE id=$4', [title, completed, importance, id])
		.then((res) => response.status(200).json({ msg: 'Todo is successfully updated' }))
		.catch((err) => response.status(400).json({ msg: 'Failed to update the todo' }));
};

module.exports = { getAllTodos, getTodo, createTodo, deleteTodo, deleteAllTodos, updateTodo };
