import { useState } from 'react';
import axios from 'axios';
import { handleError, handleChange } from '../utils/HelperFunctions';
import { createOptions } from '../context/RequestOptions';
import { changeOrGetData } from '../context/Requests';

export default function ToDoInput(props) {
	const { getAllTodos, token } = props;

	const [input, setInput] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	function handleSubmit(event) {
		event.preventDefault();

		const options = createOptions('post', '/todos', 'cors', 'application/json', token, { title: input });

		if (input !== '') {
			changeOrGetData({
				options,
				successCb: (res) => {
					getAllTodos();
				},
				errorCb: (err) => {
					handleError(err, setErrorMsg);
				},
			});
		}
		setInput('');
	}

	return (
		<div>
			<form className='form' onSubmit={handleSubmit}>
				<input type='text' placeholder='Add todo' value={input} className='todoInput' onChange={(e) => handleChange(e, setInput)} />
				<p className='errorMsg'>{errorMsg}</p>
			</form>
		</div>
	);
}
