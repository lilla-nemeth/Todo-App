import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToDo from './components/ToDo';
import SignUp from './components/login-signup/SignUp';
import Login from './components/login-signup/Login';
import Navbar from './components/Navbar';
import './styles/App.css';
import { handleError, handleLogOut, createOptions } from './utils/helperFunctions';
import { changeOrGetData } from './context/Requests';
import { Username } from './types/types';

const App = () => {
	const [token, setToken] = useState<string | null>(null);
	const [username, setUsername] = useState<Username>('');
	const [errorMsg, setErrorMsg] = useState<string>('');

	function addUser(token: string | null) {
		const options = createOptions('get', '/user', 'cors', 'application/json', token, null);

		changeOrGetData({
			options,
			successCb: (res: any) => {
				setUsername(res.data);
			},
			errorCb: (err: any) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	useEffect(() => {
		const tokenFromLocalStorage: string | null = localStorage.getItem('token');

		if (tokenFromLocalStorage) {
			setToken(tokenFromLocalStorage);

			addUser(token);
		}
	}, [token]);

	if (!token) {
		return (
			<>
				<BrowserRouter>
					<Routes>
						<Route path='/signup' element={<SignUp />}></Route>
						<Route path='/login' element={<Login setToken={setToken} />}></Route>
						<Route path='*' element={<Login setToken={setToken} />}></Route>
					</Routes>
				</BrowserRouter>
			</>
		);
	}
	return (
		<>
			<BrowserRouter>
				<Navbar handleLogOut={handleLogOut} setToken={setToken} username={username} />
				<Routes>
					<Route path='/' element={<ToDo token={token} />}></Route>
					<Route path='*' element={<ToDo token={token} />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
