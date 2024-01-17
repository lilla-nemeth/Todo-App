import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { TodoItem, Headers, Request, AxiosRequestConfig, AxiosResponse, AxiosError } from '../types/types';
import * as priority from '../types/priority';
import axios from 'axios';

let timeOut: NodeJS.Timeout;

export const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, event: ChangeEvent<HTMLInputElement>) => {
	stateSetter(event.target.value);
};

export const handleError = (err: AxiosError, stateSetter: Dispatch<SetStateAction<string>>) => {
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

export const generateId = (num: string) => {
	const number = Number(num);

	if (number === 1) {
		return priority.notImportant;
	} else if (number === 2) {
		return priority.important;
	} else {
		return priority.urgent;
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

export const createOptions = (
	requestMethod: AxiosRequestConfig['method'],
	endpoint: AxiosRequestConfig['url'],
	mode: AxiosRequestConfig['mode'],
	appJson: Headers['appJson'],
	token: string,
	dataObject: AxiosRequestConfig['data']
) => {
	const options = {
		method: requestMethod,
		url: endpoint,
		mode: mode,
		headers: {
			'Content-Type': appJson,
			'x-auth-token': token,
		},
		data: dataObject,
	};

	return options;
};

export const changeOrGetData: Request = ({ options, successCb, errorCb }) => {
	axios(options)
		.then((res: AxiosResponse) => {
			if (res && successCb) successCb(res);
		})
		.catch((err: AxiosError) => {
			if (err && errorCb) errorCb(err);
		});
};
