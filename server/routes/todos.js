const { Router } = require('express');
const { authMw } = require('../middlewares/middlewares.js');
const { getAllTodos, getTodo, createTodo, deleteTodo, deleteAllTodos, updateTodo } = require('../controllers/todoControllers.js');

const router = Router();

router.get('/', authMw, getAllTodos);
router.get('/:id', authMw, getTodo);

router.post('/', authMw, createTodo);

router.delete('/:id', authMw, deleteTodo);
router.delete('/', authMw, deleteAllTodos);

router.put('/:id', authMw, updateTodo);

module.exports = router;
