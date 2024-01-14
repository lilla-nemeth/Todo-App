import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils/helperFunctions';
import ToDoInput from './ToDoInput';
import ToDoElement from './ToDoElement';
import SortingButtons from './SortingButtons';
import { createOptions } from '../context/RequestOptions.js';
import { changeOrGetData } from '../context/Requests.js';
import { Token, TodoItem, TodoOrderNames } from '../types/interfaces';

export const order: { [index: string]: any } = {
	newest: 'Newest',
	oldest: 'Oldest',
	mostImportant: 'Most Important',
	leastImportant: 'Least Important',
	uncompleted: 'Uncompleted',
	completed: 'Completed',
};

const ToDo = (props: Token) => {
	const { token } = props;
	const [allTodos, setAllTodos] = useState<TodoItem[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [orderBy, setOrderBy] = useState<TodoOrderNames['newest']>(order.newest);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	function getAllTodos() {
		const options = createOptions('get', '/todos', 'cors', 'application/json', token, null);

		changeOrGetData({
			options,
			successCb: (res: any) => {
				setLoading(false);
				setAllTodos(res.data);
			},
			errorCb: (err: any) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	function deleteAllTodos(token: string) {
		const options = createOptions('delete', '/todos', 'cors', 'application/json', token, {});

		changeOrGetData({
			options,
			successCb: (res: any) => {
				setAllTodos([]);
			},
			errorCb: (err: any) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	useEffect(() => {
		navigate('/');

		getAllTodos();
	}, []);

	// const sortedAllTodos: TodoItem[] = allTodos.sort((a, b) => {
	// if (orderBy === order.newest) {
	// 	// const createdA: TodoItem['created'] = a.created;
	// 	// const createdB: TodoItem['created'] = b.created;
	// 	if (a.created.valueOf() < b.created.valueOf()) {
	// 		return 1;
	// 	} else {
	// 		return -1;
	// 	}
	// }
	// if (orderBy === order.oldest) {
	// 	if (a.created.valueOf() < b.created.valueOf()) {
	// 		return -1;
	// 	} else {
	// 		return 1;
	// 	}
	// }
	// if (orderBy === order.mostImportant) {
	// 	if (a.importance === b.importance) {
	// 		if (a.title < b.title) {
	// 			return 1;
	// 		} else {
	// 			return -1;
	// 		}
	// 	} else {
	// 		if (a.importance < b.importance) {
	// 			return 1;
	// 		} else {
	// 			return -1;
	// 		}
	// 	}
	// }
	// if (orderBy === order.leastImportant) {
	// 	if (a.importance === b.importance) {
	// 		if (a.title < b.title) {
	// 			return -1;
	// 		} else {
	// 			return 1;
	// 		}
	// 	} else {
	// 		if (a.importance < b.importance) {
	// 			return -1;
	// 		} else {
	// 			return 1;
	// 		}
	// 	}
	// }
	// if (orderBy === order.uncompleted) {
	// 	if (!a.completed && !b.completed) {
	// 		return;
	// 	} else {
	// 		if (a.completed < b.completed) {
	// 			return -1;
	// 		} else {
	// 			return 1;
	// 		}
	// 	}
	// }
	// if (orderBy === order.completed) {
	// 	if (!a.completed && !b.completed) {
	// 		return;
	// 	} else {
	// 		if (a.completed < b.completed) {
	// 			return 1;
	// 		} else {
	// 			return -1;
	// 		}
	// 	}
	// }
	// });

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
				<ToDoInput getAllTodos={() => getAllTodos()} token={token} />
				<SortingButtons orderBy={orderBy} setOrderBy={setOrderBy} />
				{/* {sortedAllTodos.map((el: any) => {
					return <ToDoElement key={el.id} getAllTodos={() => getAllTodos()} el={el} token={token} />;
				})} */}
				{allTodos.map((el: any) => {
					return <ToDoElement key={el.id} getAllTodos={() => getAllTodos()} el={el} token={token} />;
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
