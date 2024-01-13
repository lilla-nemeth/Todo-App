let timeOut;

export function handleChange(event, setter) {
	setter(event.target.value);
}

export function handleError(err, setter) {
	setter(err && err.response && err.response.data && err.response.data.msg);

	timeOut = setTimeout(() => {
		setter('');
	}, 5000);
}

export function clearError() {
	clearTimeout(timeOut);
}

export function selectToEdit(el, editedId, idSetter, inputSetter) {
	if (el && editedId === el.id) {
		idSetter(null);
		inputSetter('');
	} else {
		idSetter(el.id);
		inputSetter(el.title);
	}
}

export function generateId(num) {
	const number = Number(num);

	if (number === 1) {
		return 'notimportant';
	} else if (number === 2) {
		return 'important';
	} else {
		return 'urgent';
	}
}

export function changeColor(number, isCompleted, doneColor, notImportantColor, importantColor, urgentColor) {
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

export function handleLogOut(setToken) {
	localStorage.removeItem('token');
	setToken(null);
}
