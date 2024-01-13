import React, { useEffect, useState } from 'react';
import ToDo from './components/ToDo';
import SignUp from './components/login-signup/SignUp';
import Login from './components/login-signup/Login';
// import Login from './components/login-signup/Login.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles/App.css';
import { handleError, handleLogOut } from './utils/HelperFunctions';
import { createOptions } from './context/RequestOptions';
import { changeOrGetData } from './context/Requests';

function App() {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	function addUser(token) {
		const options = createOptions('get', '/user', 'cors', 'application/json', token, null);

		changeOrGetData({
			options,
			successCb: (res) => {
				setUser(res.data);
			},
			errorCb: (err) => {
				handleError(err, setErrorMsg);
			},
		});
	}

	useEffect(() => {
		let tokenFromLocalStorage = localStorage.getItem('token');

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
				<Navbar handleLogOut={handleLogOut} setToken={setToken} user={user} />
				<Routes>
					<Route exact path='/' element={<ToDo token={token} />}></Route>
					<Route path='*' element={<ToDo token={token} />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
