import { useState, useRef, ChangeEvent } from 'react';
import Sugar from 'sugar';
import { handleError, selectToEdit, createFormattedDate, createOptions } from '../utils/helperFunctions';
import Dropdown from './Dropdown';
import Tooltip from './Tooltip';
import Pencil from '../assets/icons/Pencil';
import Trash from '../assets/icons/Trash';
import Calendar from '../assets/icons/Calendar';
import { changeOrGetData } from '../utils/helperFunctions';
import { TodoItem, AxiosRequestConfig, AxiosError, TodoElementProps } from '../types/types';
import TextInput from './generic/TextInput';
import Button from './generic/Button';
import CheckboxInput from './generic/CheckboxInput';

const ToDoElement = (props: TodoElementProps) => {
	const { getAllTodos, token, el } = props;
	const [allTodos, setAllTodos] = useState<TodoItem[]>([]);
	const [editedTodoId, setEditedTodoId] = useState<number | null>(null);
	const [editedTodoInput, setEditedTodoInput] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [hover, setHover] = useState<boolean>(false);
	const hoverTimeOut = useRef<number | any>(null);

	function deleteElement(id: number) {
		const options: AxiosRequestConfig = createOptions('delete', `/todos/${id}`, 'cors', 'application/json', token, { title: allTodos });

		changeOrGetData({
			options,
			successCb: () => {
				getAllTodos(token);
			},
			errorCb: (err: AxiosError) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	function completeTodo(el: TodoItem) {
		const options = createOptions('put', `/todos/${el.id}`, 'cors', 'application/json', token, {
			title: el.title,
			completed: el.completed ? false : true,
			importance: el.importance,
		});

		changeOrGetData({
			options,
			successCb: () => {
				getAllTodos(token);
			},
			errorCb: (err: AxiosError) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	function editTodo(el: TodoItem, event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const options = createOptions('put', `/todos/${el.id}`, 'cors', 'application/json', token, {
			title: editedTodoInput,
			completed: el.completed,
			importance: el.importance,
		});

		changeOrGetData({
			options,
			successCb: () => {
				getAllTodos(token);
				setEditedTodoId(null);
				setEditedTodoInput('');
			},
			errorCb: (err: AxiosError) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	function updateImportance(el: TodoItem, number: number) {
		const options = createOptions('put', `/todos/${el.id}`, 'cors', 'application/json', token, {
			title: el.title,
			completed: el.completed,
			importance: number,
		});

		changeOrGetData({
			options,
			successCb: () => {
				getAllTodos(token);
			},
			errorCb: (err: AxiosError) => {
				console.log(err);
				handleError(err, setErrorMsg);
			},
		});
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEditedTodoInput(event.target.value);
	};

	const handleMouseEnter = () => {
		hoverTimeOut.current = setTimeout(() => {
			setHover(true);
		}, 200);
	};

	const handleMouseLeave = () => {
		if (hoverTimeOut.current) {
			clearTimeout(hoverTimeOut.current);
			hoverTimeOut.current = null;
		}
		setHover(false);
	};

	return (
		<div className='todoWrapper'>
			<div className='checkboxTitleButtons'>
				<div className='todoElement' key={el.id}>
					<CheckboxInput
						labelClassName={'checkboxContainer'}
						htmlFor={el.id.toString()}
						id={el.id.toString()}
						type={'checkbox'}
						name={'checkbox'}
						checked={el.completed}
						checkmarkClassName={'checkmark'}
						onChange={() => completeTodo(el)}
					/>
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
									<TextInput
										labelName={''}
										labelClassName={''}
										htmlFor={''}
										type={'text'}
										id={'edit-todo-input'}
										className={'editInput'}
										name={'edit-todo'}
										placeholder={'Edit todo'}
										autoComplete={'on'}
										required={true}
										autoFocus={true}
										value={editedTodoInput}
										onChange={handleInputChange}
									/>
								</form>
							</div>
						</div>
					)}
				</div>
				<div className='buttonListRow'>
					{editedTodoId != el.id ? (
						<div className='buttonListElements'>
							<Button
								className={el.completed ? 'buttonEditInactive' : 'buttonEdit'}
								onClick={() => selectToEdit(el, editedTodoId, setEditedTodoId, setEditedTodoInput)}
								buttonContent={<Pencil />}
							/>
						</div>
					) : (
						<div className='buttonListElements'>
							<Button
								className={'buttonEdit'}
								onClick={() => selectToEdit(el, editedTodoId, setEditedTodoId, setEditedTodoInput)}
								buttonContent={<Pencil />}
							/>
						</div>
					)}
					<div className='buttonListElements'>
						<Button className={'buttonDelete'} onClick={() => deleteElement(el.id)} buttonContent={<Trash />} />
					</div>
					<Tooltip
						hover={hover}
						date={createFormattedDate(Sugar, el, '{dd}/{MM}/{yyyy}')}
						time={createFormattedDate(Sugar, el, '{HH}:{mm}:{ss}')}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						calendar={
							<>
								<div className='buttonListElements'>
									<Button className={!hover ? 'buttonCalendar buttonWhite' : 'buttonCalendar buttonGreen'} buttonContent={<Calendar />} />
								</div>
							</>
						}
					></Tooltip>
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
