// TYPES
export type Username = string;
export type Token = string;
export type Title = string;
export type Completed = boolean;
export type Importance = number;
export type TodoId = number;
export type UserId = number;
export type Method =
	| 'get'
	| 'GET'
	| 'delete'
	| 'DELETE'
	| 'head'
	| 'HEAD'
	| 'options'
	| 'OPTIONS'
	| 'post'
	| 'POST'
	| 'put'
	| 'PUT'
	| 'patch'
	| 'PATCH'
	| 'purge'
	| 'PURGE'
	| 'link'
	| 'LINK'
	| 'unlink'
	| 'UNLINK';

// INTERFACES
export interface TodoItem {
	id: TodoId;
	userid: UserId;
	title: Title;
	importance: Importance;
	completed: Completed;
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

export interface AxiosRequestConfig {
	method?: Method;
	url?: string;
	headers?: Record<string, string>;
	data?: DataToken | DataLogin | DataMessage | DataToken | DataSignUp | Username | DataDeleteTodo | DataInput | DataUpdateTodo;
	mode?: string;
}

export interface RequestArgs {
	options: AxiosRequestConfig;
	successCb: Function;
	errorCb: Function;
}

// export interface AxiosResponse<T = never> {
// 	data: T;
// 	status: number;
// 	statusText: string;
// 	headers: Record<string, string>;
// 	config: AxiosRequestConfig<T>;
// 	request?: any;
// }
export type AxiosResponse = any;

export interface AxiosError extends Error {
	config: AxiosRequestConfig;
	code?: string;
	request?: any;
	response?: any;
	isAxiosError: boolean;
	toJSON: () => object;
}

export interface AxiosPromise extends Promise<Response> {}

export type Request = (object: { options: AxiosRequestConfig; successCb: Function; errorCb: Function }) => void;

// export type HTTPRequest = (input: RequestArgs) => AxiosPromise;

// PROPS
export interface TodoProps {
	token: Token;
}

export interface TodoElementProps {
	getAllTodos: Function;
	token: Token;
	el: TodoItem;
}

export interface LoginProps {
	setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface BubbleIconProps {
	backgroundColor?: string;
	textColor?: string;
	fontSize?: string;
	date: string;
	time: string;
}

export interface TooltipProps {
	calendar: any;
	hover: boolean;
	setHover: React.Dispatch<React.SetStateAction<boolean>>;
	date: string;
	time: string;
}

export interface TodoInputProps {
	getAllTodos: Function;
	token: Token;
}

export interface SortingProps {
	orderBy:
		| TodoOrderNames['newest']
		| TodoOrderNames['oldest']
		| TodoOrderNames['mostImportant']
		| TodoOrderNames['leastImportant']
		| TodoOrderNames['uncompleted']
		| TodoOrderNames['completed'];
	setOrderBy: React.Dispatch<
		React.SetStateAction<
			| TodoOrderNames['newest']
			| TodoOrderNames['oldest']
			| TodoOrderNames['mostImportant']
			| TodoOrderNames['leastImportant']
			| TodoOrderNames['uncompleted']
			| TodoOrderNames['completed']
		>
	>;
}

export interface NavbarProps {
	username: Username;
	handleLogOut: Function;
	setToken: React.Dispatch<React.SetStateAction<Token>>;
}

export interface DropdownProps {
	value: TodoItem['importance'];
	isCompleted: TodoItem['completed'];
	onSelect: Function;
}

export interface IconClassNameProps {
	className: string;
}
