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
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');
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
        email,
        username,
        pw
      },
    };

    axios(options)
      .then(
        (res) => {
          setSuccessMsg(res.data.msg);
          setTimeout(() => {
            setSuccessMsg('');
            setEmail('');
            setUsername('');
            setPw('');
          }, 2500)
        }
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
