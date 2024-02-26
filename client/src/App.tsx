import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToDo from './components/ToDo';
import SignUp from './components/login-signup/SignUp';
import Login from './components/login-signup/Login';
import Navbar from './components/Navbar';
import './styles/App.css';
import { handleLogOut } from './utils/helperFunctions';

const App = () => {
	const [token, setToken] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');

	useEffect(() => {
		const tokenFromLocalStorage: string | null = localStorage.getItem('token');

		if (tokenFromLocalStorage) {
			setToken(tokenFromLocalStorage);
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
				<Navbar handleLogOut={handleLogOut} setToken={setToken} />
				<Routes>
					<Route path='/todos' element={<ToDo token={token} />}></Route>
					<Route path='*' element={<ToDo token={token} />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
