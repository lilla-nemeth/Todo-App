import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
}


export default function SignUp() {
    // useState = kezdő érték
    // setterek meg változtatják az értékét
    const [inputEmail, setInputEmail] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // event = a leütött billentyű, amit ezzel választunk ki: event.target.value

    // This version or arrow function in the onChange (below)
    // function handleEmailChange(event) {
    //     setInputEmail(event.target.value);
    // }
    // function handleUsernameChange(event) {
    //     setInputUsername(event.target.value);
    // }
    // function handlePasswordChange(event) {
    //     setInputPassword(event.target.value);
    // }

    function handleSubmit(event) {
        event.preventDefault();

        // console.log(inputEmail, inputUsername, inputPassword);
        // then mindig a válasz
        // fetch funkció 2 inputot fogad: URL, objektum (get kérésnél nem kötelező objektumot megadni, minden más esetben viszont kell)
        let options = {
            method: 'post',
            url: '/signup',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            data: {
                email: inputEmail,
                username: inputUsername,
                pw: inputPassword
            }
        };
        // fetch('http://localhost:3002/signup', options)
        // .then((rawRes) => rawRes.json())
        // .then((res) => console.log(res))

        axios(options)
        .then((res) => setSuccessMsg(res.data.msg))
        .catch((err) => handleError(err, setErrorMsg));
    }

    createHistory().replace('/signup');

    return (
        <main>
            <section className="container">
            <h3>Sign Up</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="email" style={styles.div}>
                    <label style={styles.label}>Email</label>
                    <input name="email" type="email" placeholder="Write Your Email" value={inputEmail} onChange={(event) => setInputEmail(event.target.value)}/>
                </div>
                <div className="username" style={styles.div}>
                    <label style={styles.label}>Username</label>
                    <input name="username" type="text" placeholder="Write Your Username" value={inputUsername} onChange={(event) => setInputUsername(event.target.value)}/>
                </div>
                <div className="password" style={styles.div}>
                    <label style={styles.label}>Password</label>
                    <input name="password" type="password" placeholder="Write Your Password" value={inputPassword} onChange={(event) => setInputPassword(event.target.value)}/>
                </div>
                <button>Send</button>
                <div className="textLoginContainer">
                    <p>Do you have account?</p>
                    <Link className="textLoginUp" to="/login">
                        <p>Login</p>
                    </Link>
                </div>
            </form>
            <div className="errorMessage">
                <p>{errorMsg}</p>
            </div>
            <div className="successMessage">
                <p>{successMsg}</p>
            </div>
            </section>
        </main>
    )
}
