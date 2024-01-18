import { useState } from 'react';
import { handleError, handleInputChange, createOptions } from '../utils/helperFunctions';
import { changeOrGetData } from '../utils/helperFunctions';
import { DataInput, AxiosRequestConfig, AxiosError, TodoInputProps } from '../types/types';
import TextInput from './generic/TextInput';

const ToDoInput = (props: TodoInputProps) => {
	const { getAllTodos, token } = props;
	const [input, setInput] = useState<DataInput['title']>('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const options: AxiosRequestConfig = createOptions('post', '/todos', 'cors', 'application/json', token, { title: input });

		if (input !== '') {
			changeOrGetData({
				options,
				successCb: () => {
					getAllTodos();
				},
				errorCb: (err: AxiosError) => {
					handleError(err, setErrorMsg);
				},
			});
		}
		setInput('');
	};

	return (
		<div>
			<form className='form' onSubmit={handleSubmit}>
				<TextInput
					labelName={''}
					labelClassName={''}
					htmlFor={''}
					type={'text'}
					id={'todo-input'}
					className={'todoInput'}
					name={'todo'}
					placeholder={'Add todo'}
					autoComplete={'on'}
					required={true}
					autoFocus={true}
					value={input}
					onChange={(event) => handleInputChange(setInput, event)}
				/>
				<p className='errorMsg'>{errorMsg}</p>
			</form>
		</div>
	);
};

export default ToDoInput;
