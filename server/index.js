const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { getAll } = require('./controllers/clientControllers.js');

const todosRouter = require('./routes/todos.js');
const loginRouter = require('./routes/login.js');
const signUpRouter = require('./routes/signUp.js');

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use('/todos', todosRouter);

app.use('/login', loginRouter);

app.use('/signup', signUpRouter);

app.get('*', getAll);

module.exports = app;
