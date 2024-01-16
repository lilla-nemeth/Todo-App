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
	method?: string;
	url?: string;
	headers?: Record<string, string>;
	data?: DataToken | DataLogin | DataMessage | DataToken | DataSignUp | Username | DataDeleteTodo | DataInput | DataUpdateTodo;
	mode?: string;
	// baseURL?: string;
	// transformRequest?: any;
	// transformResponse?: any;
	// params?: any;
	// paramsSerializer?: (params: any) => string;
	// timeout?: number;
	// timeoutErrorMessage?: string;
	// withCredentials?: boolean;
	// adapter?: any;
	// auth?: any;
	// responseType?: ResponseType;
	// xsrfCookieName?: string;
	// xsrfHeaderName?: string;
	// onUploadProgress?: (progressEvent: any) => void;
	// onDownloadProgress?: (progressEvent: any) => void;
	// maxContentLength?: number;
	// validateStatus?: ((status: number) => boolean) | null;
	// maxBodyLength?: number;
	// maxRedirects?: number;
	// socketPath?: string | null;
	// httpAgent?: any;
	// httpsAgent?: any;
	// proxy?: any | false;
	// cancelToken?: any;
	// decompress?: boolean;
	// transitional?: any;
}

export interface RequestArgs {
	options: AxiosRequestConfig;
	successCb: Function;
	errorCb: Function;
}

// export interface AxiosResponse<T = any> {
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
