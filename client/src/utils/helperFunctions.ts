import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { TodoItem } from '../types/interfaces';

// TODO: change any type
let timeOut: any;

export const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, event: ChangeEvent<HTMLInputElement>) => {
	stateSetter(event.target.value);
};

// TODO: create interface in types for err and change type of any
export const handleError = (err: any, stateSetter: Dispatch<SetStateAction<string>>) => {
	stateSetter(err && err.response && err.response.data && err.response.data.msg);

	timeOut = setTimeout(() => {
		stateSetter('');
	}, 5000);
};

export const clearError = () => {
	clearTimeout(timeOut);
};

export const selectToEdit = (
	el: TodoItem,
	editedId: number | null,
	stateSetterForID: Dispatch<SetStateAction<number | null>>,
	stateSetterForInput: Dispatch<SetStateAction<string>>
) => {
	if (el && editedId === el.id) {
		stateSetterForID(null);
		stateSetterForInput('');
	} else {
		stateSetterForID(el.id);
		stateSetterForInput(el.title);
	}
};

// TODO: use constants for these strings
export const generateId = (num: string) => {
	const number = Number(num);

	if (number === 1) {
		return 'notimportant';
	} else if (number === 2) {
		return 'important';
	} else {
		return 'urgent';
	}
};

export const handleLogOut = (stateSetter: Dispatch<SetStateAction<string | null>>) => {
	localStorage.removeItem('token');
	stateSetter(null);
};

export const createFormattedDate = (Sugar: sugarjs.Sugar, el: TodoItem, dateFormat: string) => {
	const date = Sugar.Date.create(el.created);
	const formattedDate = Sugar.Date.format(date, dateFormat);
	return formattedDate;
};

export const changeColor = (
	number: TodoItem['importance'],
	isCompleted: TodoItem['completed'],
	doneColor: string,
	notImportantColor: string,
	importantColor: string,
	urgentColor: string
) => {
	if (isCompleted) {
		return doneColor;
	} else if (number === 1) {
		return notImportantColor;
	} else if (number === 2) {
		return importantColor;
	} else if (number === 3) {
		return urgentColor;
	}
};
