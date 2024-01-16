export type Username = string;
export type Token = string;
export type Title = string;
export type Completed = boolean;
export type Importance = number;
export type TodoId = number;
export type UserId = number;

export type TodoProps = {
	token: Token;
};

export interface TodoItem {
	id: TodoId;
	userid: UserId;
	title: Title;
	importance: Importance;
	completed: Completed;
	created: string;
}

export interface TodoItem extends Array<TodoItem> {}

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

export interface DataInput {
	title: string;
}

export interface DataUpdateTodo {
	title: Title;
	completed: Completed;
	importance: Importance;
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
	data?: DataToken | DataLogin | DataMessage | DataToken | DataSignUp | Username | DataDeleteTodo | DataInput | DataUpdateTodo;
}

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
