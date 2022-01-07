import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

export default function Login(props) {

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    let options = {
      method: 'post',
      url: '/login',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        pw,
      },
    };
    axios(options)
      .then((res) => {
        let token = res.data.token;

        localStorage.setItem('token', token);
        props.setToken(token);
        setEmail('');
        setPw('');
      })
      .catch((err) => {
        handleError(err, setErrorMsg);
      });
  }

  createHistory().replace('/login');

  return (
    <main>
      <section className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className='email' style={styles.div}>
            <label style={styles.label}>Email</label>
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
          <div className='password' style={styles.div}>
            <label style={styles.label}>Password</label>
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
            <button className='buttonSignUp'>Login</button>
          </div>
          <div className='textSignUpContainer'>
            <p>Need an account?</p>
            <Link className='textSignUp' to='/signup' style={{textDecoration: 'none'}}>
              <p className='signUp'>Sign Up</p>
            </Link>
          </div>
        </form>
        <div className='errorMessage'>
          <p>{errorMsg}</p>
        </div>
      </section>
    </main>
  );
}
