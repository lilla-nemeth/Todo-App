import { useState } from 'react';
import { handleError, handleInputChange, createOptions } from '../utils/helperFunctions';
import { changeOrGetData } from '../context/Requests';
import { DataInput } from '../types/types';

const ToDoInput = (props: any) => {
	const { getAllTodos, token } = props;
	const [input, setInput] = useState<DataInput['title']>('');
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
					id='todo-input'
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
