import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, clearError, handleInputChange, createOptions } from '../../utils/helperFunctions';
import { changeOrGetData } from '../../context/Requests';
import { DataMessage, DataSignUp } from '../../types/interfaces';

const SignUp = () => {
	const [email, setEmail] = useState<DataSignUp['email']>('');
	const [username, setUsername] = useState<DataSignUp['username']>('');
	const [pw, setPw] = useState<DataSignUp['pw']>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [successMsg, setSuccessMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const disabled = !email || !username || !pw || loading;

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const options = createOptions('post', '/signup', 'cors', 'application/json', null, { email, username, pw });

		if (!disabled) {
			setLoading(true);

			changeOrGetData({
				options,
				successCb: (res: any) => {
					const message: DataMessage['msg'] = res.data.msg;
					setLoading(false);
					setErrorMsg('');
					setSuccessMsg(message);
					setTimeout(() => {
						setSuccessMsg('');
						setEmail('');
						setUsername('');
						setPw('');
						navigate('/login');
					}, 2500);
				},
				errorCb: (err: any) => {
					setLoading(false);
					clearError();
					handleError(err, setErrorMsg);
				},
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
							onChange={(event) => handleInputChange(setEmail, event)}
						/>
					</div>
					<div className='username'>
						<label className='usernameLabel'>Username</label>
						<input
							className='signUpInput'
							name='username'
							type='text'
							placeholder='Username'
							value={username}
							onChange={(event) => handleInputChange(setUsername, event)}
						/>
					</div>
					<div className='password'>
						<label className='passwordLabel'>Password</label>
						<input
							className='signUpInput'
							name='password'
							type='password'
							placeholder='Password'
							value={pw}
							onChange={(event) => handleInputChange(setPw, event)}
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
};

export default SignUp;
