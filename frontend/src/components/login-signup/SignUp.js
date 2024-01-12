import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, clearError } from '../../utils/HelperFunctions';

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [pw, setPw] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	let disabled = !email || !username || !pw || loading;

	function handleSubmit(event) {
		event.preventDefault();

		let options = {
			method: 'post',
			url: '/signup',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				email,
				username,
				pw,
			},
		};

		if (!disabled) {
			setLoading(true);

			axios(options)
				.then((res) => {
					setLoading(false);
					setErrorMsg('');
					setSuccessMsg(res.data.msg);
					setTimeout(() => {
						setSuccessMsg('');
						setEmail('');
						setUsername('');
						setPw('');
						navigate('/login');
					}, 2500);
				})
				.catch((err) => {
					setLoading(false);
					clearError();
					handleError(err, setErrorMsg);
				});
		}
	}

	return (
		<main>
			<section className='container'>
				<form className='form' method='POST' onSubmit={handleSubmit}>
					<h3>Sign Up</h3>
					<div className='email'>
						<label className='emailLabel'>Email</label>
						<input
							className='signUpInput'
							name='email'
							type='email'
							placeholder='Email address'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div className='username' style={styles.div}>
						<label style={styles.label}>Username</label>
						<input
							className='signUpInput'
							name='username'
							type='text'
							placeholder='Username'
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
					</div>
					<div className='password' style={styles.div}>
						<label style={styles.label}>Password</label>
						<input
							className='signUpInput'
							name='password'
							type='password'
							placeholder='Password'
							value={pw}
							onChange={(event) => setPw(event.target.value)}
						/>
					</div>
					<div>
						<button type='submit' className={disabled ? 'buttonSignUpInactive' : 'buttonSignUp'} disabled={disabled}>
							Create Account
						</button>
					</div>
					<div className='textLoginContainer'>
						<p>Do you have account?</p>
						<Link className='textLoginUp' to='/login' style={{ textDecoration: 'none' }}>
							<p className='login'>Login</p>
						</Link>
					</div>
				</form>
				<div className='message'>
					<p className='errorMessage'>{errorMsg}</p>
					<p className='successMessage'>{successMsg}</p>
				</div>
			</section>
		</main>
	);
}
