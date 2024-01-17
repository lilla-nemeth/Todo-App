import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, createOptions, sortedAllTodos } from '../utils/helperFunctions';
import ToDoInput from './ToDoInput';
import ToDoElement from './ToDoElement';
import SortingButtons from './SortingButtons';
import { changeOrGetData } from '../utils/helperFunctions';
import { TodoItem, TodoOrderNames, TodoProps, Token, AxiosRequestConfig, AxiosResponse, AxiosError } from '../types/types';

export const order: { [index: string]: any } = {
	newest: 'Newest',
	oldest: 'Oldest',
	mostImportant: 'Most Important',
	leastImportant: 'Least Important',
	uncompleted: 'Uncompleted',
	completed: 'Completed',
};

const ToDo = (props: TodoProps) => {
	const { token } = props;
	const [allTodos, setAllTodos] = useState<TodoItem[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [orderBy, setOrderBy] = useState<TodoOrderNames['newest']>(order.newest);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	function getAllTodos(token: Token) {
		const options: AxiosRequestConfig = createOptions('get', '/todos', 'cors', 'application/json', token, undefined);

		changeOrGetData({
			options,
			successCb: (res: AxiosResponse) => {
				setLoading(false);
				setAllTodos(res.data);
			},
			errorCb: (err: AxiosError) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	function deleteAllTodos(token: Token) {
		const options: AxiosRequestConfig = createOptions('delete', '/todos', 'cors', 'application/json', token, undefined);

		changeOrGetData({
			options,
			successCb: () => {
				setAllTodos([]);
			},
			errorCb: (err: AxiosError) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	useEffect(() => {
		navigate('/');

		getAllTodos(token);
	}, []);

	if (loading) {
		return (
			<div className='loaderContainer'>
				<svg className='loader'>
					<circle className='loaderCircle' cx='35' cy='35' r='35'></circle>
				</svg>
			</div>
		);
	}

	return (
		<main className='todoMain'>
			<section className='todoContainer'>
				<ToDoInput getAllTodos={() => getAllTodos(token)} token={token} />
				<SortingButtons orderBy={orderBy} setOrderBy={setOrderBy} />
				{/* {sortedAllTodos.map((el: any) => {
					return <ToDoElement key={el.id} getAllTodos={() => getAllTodos(token)} el={el} token={token} />;
				})} */}
				{allTodos.map((el: any) => {
					return <ToDoElement key={el.id} getAllTodos={() => getAllTodos(token)} el={el} token={token} />;
				})}
				{allTodos.length > 0 && (
					<div className='buttonDeleteAllContainer'>
						<button onClick={() => deleteAllTodos(token)} className='buttonDeleteAll'>
							Delete all
						</button>
					</div>
				)}
			</section>
		</main>
	);
};

export default ToDo;
