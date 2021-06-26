import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from './HelperFunctions.js';
import createHistory from 'history/createBrowserHistory';

const styles = {
  div: {
    marginBottom: '20px',
  },
  label: {
    display: 'inline-block',
    width: '100px',
  },
};

export default function SignUp() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
        email: inputEmail,
        username: inputUsername,
        pw: inputPassword,
      },
    };

    axios(options)
      .then(
        (res) => setSuccessMsg(res.data.msg),
        setTimeout(() => {
          setSuccessMsg('');
        }, 5000)
      )
      .catch((err) => handleError(err, setErrorMsg));
  }

  createHistory().replace('/signup');

  return (
    <main>
      <section className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className='email' style={styles.div}>
            <label style={styles.label}>Email</label>
            <input
              className='signUpInput'
              name='email'
              type='email'
              placeholder='Email address'
              value={inputEmail}
              onChange={(event) => setInputEmail(event.target.value)}
            />
          </div>
          <div className='username' style={styles.div}>
            <label style={styles.label}>Username</label>
            <input
              className='signUpInput'
              name='username'
              type='text'
              placeholder='Username'
              value={inputUsername}
              onChange={(event) => setInputUsername(event.target.value)}
            />
          </div>
          <div className='password' style={styles.div}>
            <label style={styles.label}>Password</label>
            <input
              className='signUpInput'
              name='password'
              type='password'
              placeholder='Password'
              value={inputPassword}
              onChange={(event) => setInputPassword(event.target.value)}
            />
          </div>
          <div>
            <button className='buttonSignUp'>Create Account</button>
          </div>
          <div className='textLoginContainer'>
            <p>Do you have account?</p>
            <Link className='textLoginUp' to='/login' style={{textDecoration: 'none'}}>
              <p className='login'>Login</p>
            </Link>
          </div>
        </form>
        <div className='errorMessage'>
          <p>{errorMsg}</p>
        </div>
        <div className='successMessage'>
          <p>{successMsg}</p>
        </div>
      </section>
    </main>
  );
}
