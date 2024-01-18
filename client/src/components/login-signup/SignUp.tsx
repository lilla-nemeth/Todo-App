import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, clearError, handleInputChange, createOptions } from '../../utils/helperFunctions';
import { changeOrGetData } from '../../utils/helperFunctions';
import { DataMessage, DataSignUp, AxiosRequestConfig, AxiosResponse, AxiosError } from '../../types/types';
import TextInput from '../generic/TextInput';

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

		const options: AxiosRequestConfig = createOptions('post', '/signup', 'cors', 'application/json', '', { email, username, pw });

		if (!disabled) {
			setLoading(true);

			changeOrGetData({
				options,
				successCb: (res: AxiosResponse) => {
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
				errorCb: (err: AxiosError) => {
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
						<TextInput
							labelName={'Email'}
							labelClassName={'emailLabel'}
							htmlFor={'email-input'}
							type={'email'}
							id={'email-input'}
							className={'signUpInput'}
							name={'email'}
							placeholder={'Email address'}
							autoComplete={'on'}
							required={true}
							value={email}
							onChange={(event) => handleInputChange(setEmail, event)}
						/>
					</div>
					<div className='username'>
						<TextInput
							labelName={'Username'}
							labelClassName={'usernameLabel'}
							htmlFor={'username-input'}
							type={'text'}
							id={'username-input'}
							className={'signUpInput'}
							name={'username'}
							placeholder={'Username'}
							autoComplete={'on'}
							required={true}
							value={username}
							onChange={(event) => handleInputChange(setUsername, event)}
						/>
					</div>
					<div className='password'>
						<TextInput
							labelName={'Password'}
							labelClassName={'passwordLabel'}
							htmlFor={'password-input'}
							type={'password'}
							id={'password-input'}
							className={'signUpInput'}
							name={'password'}
							placeholder={'Password'}
							autoComplete={'on'}
							required={true}
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
