import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { TodoItem } from '../types/interfaces';

export const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, event: ChangeEvent<HTMLInputElement>) => {
	stateSetter(event.target.value);
};

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

export function changeColor(
	number: TodoItem['importance'],
	isCompleted: TodoItem['completed'],
	doneColor: string,
	notImportantColor: string,
	importantColor: string,
	urgentColor: string
) {
	if (isCompleted) {
		return doneColor;
	} else if (number === 1) {
		return notImportantColor;
	} else if (number === 2) {
		return importantColor;
	} else if (number === 3) {
		return urgentColor;
	}
}
