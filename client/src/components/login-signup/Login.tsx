import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, clearError, handleInputChange, createOptions } from '../../utils/helperFunctions';
import { changeOrGetData } from '../../utils/helperFunctions';
import { DataToken, DataLogin, AxiosRequestConfig, AxiosResponse, AxiosError, LoginProps } from '../../types/types';
import TextInput from '../generic/TextInput';
import Button from '../generic/Button';

const Login = (props: LoginProps) => {
	const { setToken } = props;
	const [email, setEmail] = useState<DataLogin['email']>('');
	const [pw, setPw] = useState<DataLogin['pw']>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const disabled = !email || !pw || loading;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const options: AxiosRequestConfig = createOptions('post', '/login', 'cors', 'application/json', '', { email, pw });

		if (!disabled) {
			setLoading(true);

			changeOrGetData({
				options,
				successCb: (res: AxiosResponse) => {
					const token: DataToken['token'] = res.data.token;
					localStorage.setItem('token', token);
					setLoading(false);
					setErrorMsg('');
					setToken(token);
					setEmail('');
					setPw('');
				},
				errorCb: (err: AxiosError) => {
					setLoading(false);
					clearError();
					handleError(err, setErrorMsg);
				},
			});
		}
	};

	useEffect(() => {
		navigate('/login');
	}, []);

	return (
		<main>
			<section className='container'>
				<form className='form' onSubmit={handleSubmit}>
					<h3>Login</h3>
					<div className='email'>
						<TextInput
							labelName={'Email'}
							labelClassName={'emailLabel'}
							htmlFor={'email-input'}
							type={'email'}
							id={'email-input'}
							className={'loginInput'}
							name={'email'}
							placeholder={'Email address'}
							autoComplete={'on'}
							required={true}
							autoFocus={true}
							value={email}
							onChange={(event) => handleInputChange(setEmail, event)}
						/>
						<span className='loginActive'></span>
					</div>
					<div className='password'>
						<TextInput
							labelName={'Password'}
							labelClassName={'passwordLabel'}
							htmlFor={'password-input'}
							type={'password'}
							id={'password-input'}
							className={'loginInput'}
							name={'password'}
							placeholder={'Password'}
							autoComplete={'on'}
							required={true}
							autoFocus={true}
							value={pw}
							onChange={(event) => handleInputChange(setPw, event)}
						/>
					</div>
					<div>
						<Button
							type={'submit'}
							className={disabled ? 'buttonSignUpInactive' : 'buttonSignUp'}
							disabled={disabled}
							buttonContent={'Login'}
						/>
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
};

export default Login;
