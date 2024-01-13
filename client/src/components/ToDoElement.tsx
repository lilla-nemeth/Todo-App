import { useState, useRef } from 'react';
import Sugar from 'sugar';
import { handleError, selectToEdit } from '../utils/HelperFunctions';
import Dropdown from './Dropdown';
import Tooltip from './Tooltip';
import Pencil from '../assets/icons/Pencil';
import Trash from '../assets/icons/Trash';
import Calendar from '../assets/icons/Calendar';
import { createOptions } from '../context/RequestOptions.js';
import { changeOrGetData } from '../context/Requests.js';

const ToDoElement = (props: any) => {
	const { getAllTodos, token, el } = props;
	const [allTodos, setAllTodos] = useState([]);
	const [editedTodoId, setEditedTodoId] = useState(null);
	const [editedTodoInput, setEditedTodoInput] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [hover, setHover] = useState(false);
	const hoverTimeout = useRef;

	function deleteElement(id: number) {
		const options = createOptions('delete', `/todos/${id}`, 'cors', 'application/json', token, { title: allTodos });

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

	function completeTodo(el: any) {
		const options = createOptions('put', `/todos/${el.id}`, 'cors', 'application/json', token, {
			title: el.title,
			completed: el.completed ? false : true,
			importance: el.importance,
		});

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

	function editTodo(el: any, event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const options = createOptions('put', `/todos/${el.id}`, 'cors', 'application/json', token, {
			title: editedTodoInput,
			completed: el.completed,
			importance: el.importance,
		});

		changeOrGetData({
			options,
			successCb: (res: any) => {
				getAllTodos();
				setEditedTodoId(null);
				setEditedTodoInput('');
			},
			errorCb: (err: any) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	function updateImportance(el: any, number: number) {
		const options = createOptions('put', `/todos/${el.id}`, 'cors', 'application/json', token, {
			title: el.title,
			completed: el.completed,
			importance: number,
		});

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

	let sugarDate = Sugar.Date.create(el.created);
	let formattedDate = Sugar.Date.format(sugarDate, '{dd}/{MM}/{yyyy}');
	let formattedTime = Sugar.Date.format(sugarDate, '{HH}:{mm}:{ss}');

	return (
		<div className='todoWrapper'>
			<div className='checkboxTitleButtons'>
				<div className='todoElement' key={el.id}>
					<label className='checkboxContainer'>
						<input type='checkbox' checked={el.completed} onChange={() => completeTodo(el)} />
						<span className='checkmark'></span>
					</label>
					{editedTodoId != el.id ? (
						<div className='titleContainer'>
							<div className={el.completed ? 'completed' : 'todoElement'}>
								<p>{el.title}&nbsp;&nbsp;</p>
							</div>
						</div>
					) : (
						<div className='titleContainer'>
							<div className='todoElement'>
								<form onSubmit={(event) => editTodo(el, event)}>
									<input
										type='text'
										value={editedTodoInput}
										className='editInput'
										autoFocus
										onChange={(event) => setEditedTodoInput(event.target.value)}
									/>
								</form>
							</div>
						</div>
					)}
				</div>
				<div className='buttonListRow'>
					{editedTodoId != el.id ? (
						<div className='buttonListElements'>
							<button
								className={el.completed ? 'buttonEditInactive' : 'buttonEdit'}
								onClick={() => selectToEdit(el, editedTodoId, setEditedTodoId, setEditedTodoInput)}
							>
								<Pencil className='icon' />
							</button>
						</div>
					) : (
						<div className='buttonListElements'>
							<button
								className='buttonEdit'
								style={{
									backgroundColor: 'rgb(114, 180, 140)',
									border: 'none',
									fill: 'white',
								}}
								onClick={() => selectToEdit(el, editedTodoId, setEditedTodoId, setEditedTodoInput)}
							>
								<Pencil className='icon' />
							</button>
						</div>
					)}
					<div className='buttonListElements'>
						<button className='buttonDelete' onClick={() => deleteElement(el.id)}>
							<Trash className='icon' />
						</button>
					</div>
					<Tooltip hover={hover} setHover={setHover} hoverTimeout={hoverTimeout} date={formattedDate} time={formattedTime}>
						<div className='buttonListElements'>
							<button className={!hover ? 'buttonCalendar buttonWhite' : 'buttonCalendar buttonGreen'}>
								<Calendar className='icon' />
							</button>
						</div>
					</Tooltip>
				</div>
			</div>
			<div className='dropdownWrapper'>
				<Dropdown
					value={el.importance}
					isCompleted={el.completed}
					onSelect={(num: number) => {
						updateImportance(el, num);
					}}
				/>
			</div>
		</div>
	);
};

export default ToDoElement;
