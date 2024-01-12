import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError, clearError } from '../../utils/HelperFunctions.js';
import { createBrowserHistory } from 'history';
import { createOptionsWithData } from '../../context/Options.js';
import { changeOrGetData } from '../../context/Requests.js';

let history = createBrowserHistory();

export default function Login(props) {
	const { setToken } = props;
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);

	let disabled = !email || !pw || loading;

	function handleSubmit(event) {
		event.preventDefault();

		const options = createOptionsWithData('post', '/login', 'cors', 'application/json', { email, pw });

		if (!disabled) {
			setLoading(true);

			changeOrGetData({
				options,
				successCb: (res) => {
					setLoading(false);
					setErrorMsg('');
					const token = res.data.token;
					localStorage.setItem('token', token);
					setToken(token);
					setEmail('');
					setPw('');
				},
				errorCb: (err) => {
					setLoading(false);
					clearError();
					handleError(err, setErrorMsg);
				},
			});
		}
	}

	history.replace('/login');

	return (
		<main>
			<section className='container'>
				<form className='form' onSubmit={handleSubmit}>
					<h3>Login</h3>
					<div className='email'>
						<label className='emailLabel'>Email</label>
						<input
							className='loginInput'
							name='email'
							type='email'
							placeholder='Email address'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<span className='loginActive'></span>
					</div>
					<div className='password'>
						<label className='passwordLabel'>Password</label>
						<input
							className='loginInput'
							name='password'
							type='password'
							placeholder='Password'
							value={pw}
							onChange={(event) => setPw(event.target.value)}
						/>
					</div>
					<div>
						<button type='submit' className={disabled ? 'buttonSignUpInactive' : 'buttonSignUp'} disabled={disabled}>
							Login
						</button>
					</div>
					<div className='textSignUpContainer'>
						<p>Need an account?</p>
						<Link className='textSignUp' to='/signup' style={{ textDecoration: 'none' }}>
							<p className='signUp'>Sign Up</p>
						</Link>
					</div>
				</form>
				<div className='message'>
					<p className='errorMessage'>{errorMsg}</p>
				</div>
			</section>
		</main>
	);
}
