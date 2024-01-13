export interface Token {
	token: string;
}

export interface Message {
	msg: string;
}

export interface TokenData {
	[key: string]: Token;
}

export interface MessageData {
	[key: string]: Message;
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
