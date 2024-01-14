import { useState } from 'react';
// import { handleError } from '../utils/helperFunctions';
import { handleInputChange } from '../utils/helperFunctions';
import { createOptions } from '../context/RequestOptions';
import { changeOrGetData } from '../context/Requests';

const ToDoInput = (props: any) => {
	const { getAllTodos, token } = props;
	const [input, setInput] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const options = createOptions('post', '/todos', 'cors', 'application/json', token, { title: input });

		if (input !== '') {
			changeOrGetData({
				options,
				successCb: (res: any) => {
					getAllTodos();
				},
				errorCb: (err: any) => {
					handleError(err, setErrorMsg);
				},
			});
		}
		setInput('');
	};

	return (
		<div>
			<form className='form' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Add todo'
					value={input}
					className='todoInput'
					onChange={(event) => handleInputChange(setInput, event)}
				/>
				<p className='errorMsg'>{errorMsg}</p>
			</form>
		</div>
	);
};

export default ToDoInput;
