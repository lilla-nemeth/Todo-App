export type Username = string;
export type Token = string | null;

export interface DataToken {
	token: Token;
}

export interface DataMessage {
	msg: string;
}

export interface DataLogin {
	email: string;
	pw: string;
}

export interface DataSignUp {
	email: string;
	pw: string;
	username: Username;
}

export interface DataDeleteTodo {
	// { title: allTodos }
	title: TodoItem[];
}

export interface Headers {
	appJson: string;
	token?: Token;
}

export interface Options {
	method: string;
	url: string;
	mode: string;
	headers: Headers;
	data?: DataToken | DataLogin | DataMessage | DataToken | DataSignUp | Username;
}

export interface TodoItem {
	id: number;
	userid: number;
	title: string;
	importance: number;
	completed: boolean;
	created: string;
}

export interface TodoItem extends Array<TodoItem> {}

export interface TodoOrderNames {
	newest: string;
	oldest: string;
	mostImportant: string;
	leastImportant: string;
	uncompleted: string;
	completed: string;
}

export interface CallbackOneParameter<typeOne, typeTwo = void> {
	(param1: typeOne): typeTwo;
}
