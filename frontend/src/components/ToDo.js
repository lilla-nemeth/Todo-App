// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { handleError } from '../utils/HelperFunctions';
import ToDoInput from './ToDoInput.js';
import ToDoElement from './ToDoElement.js';
import SortingButtons from './SortingButtons.js';
import { createBrowserHistory } from 'history';
import { createOptionsWithToken } from '../context/Options.js';
import { changeOrGetData } from '../context/Requests.js';

let history = createBrowserHistory();

export const order = {
	newest: 'Newest',
	oldest: 'Oldest',
	mostImportant: 'Most Important',
	leastImportant: 'Least Important',
	uncompleted: 'Uncompleted',
	completed: 'Completed',
};

export default function ToDo(props) {
	const [allTodos, setAllTodos] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	const [orderBy, setOrderBy] = useState(order.newest);
	const [loading, setLoading] = useState(true);

	function getAllTodos() {
		const options = createOptionsWithToken('get', '/todos', 'cors', 'application/json', props.token);

		changeOrGetData({
			options,
			successCb: (res) => {
				setLoading(false);
				setAllTodos(res.data);
			},
			errorCb: (err) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	useEffect(() => {
		history.replace('/');
		getAllTodos();
	}, []);

	let sortedAllTodos = allTodos.sort((a, b) => {
		if (orderBy === order.newest) {
			return a.created.valueOf() < b.created.valueOf() ? 1 : -1;
		}

		if (orderBy === order.oldest) {
			return a.created.valueOf() < b.created.valueOf() ? -1 : 1;
		}

		if (orderBy === order.mostImportant) {
			if (a.importance === b.importance) {
				return a.title < b.title ? 1 : -1;
			} else {
				return a.importance < b.importance ? 1 : -1;
			}
		}

		if (orderBy === order.leastImportant) {
			if (a.importance === b.importance) {
				return a.title < b.title ? -1 : 1;
			} else {
				return a.importance < b.importance ? -1 : 1;
			}
		}

		if (orderBy === order.uncompleted) {
			if (!a.completed && !b.completed) {
				return;
			} else {
				return a.completed < b.completed ? -1 : 1;
			}
		}

		if (orderBy === order.completed) {
			if (!a.completed && !b.completed) {
				return;
			} else {
				return a.completed < b.completed ? 1 : -1;
			}
		}
	});

	if (loading) {
		return (
			<div className='loaderContainer'>
				<svg className='loader'>
					<circle className='loaderCircle' cx='35' cy='35' r='35'></circle>
				</svg>
			</div>
		);
	}

	function deleteAllTodos() {
		let options = {
			method: 'delete',
			url: '/todos',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': props.token,
			},
		};
		axios(options)
			.then((res) => {
				setAllTodos([]);
			})
			.catch((err) => {
				handleError(err, setErrorMsg);
			});
	}

	return (
		<main className='todoMain'>
			<section className='todoContainer'>
				<ToDoInput getAllTodos={() => getAllTodos()} token={props.token} />
				<SortingButtons orderBy={orderBy} setOrderBy={setOrderBy} />
				{sortedAllTodos.map((el) => {
					return <ToDoElement key={el.id} getAllTodos={() => getAllTodos()} el={el} token={props.token} />;
				})}
				{allTodos.length > 0 && (
					<div className='buttonDeleteAllContainer'>
						<button onClick={deleteAllTodos} className='buttonDeleteAll'>
							Delete all
						</button>
					</div>
				)}
			</section>
		</main>
	);
}
