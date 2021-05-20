import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleError } from './HelperFunctions.js';

const styles = {
    div: {
        marginBottom: '20px',
    },
    label: {
        display: 'inline-block',
        width: '100px',
    },
}


export default function SignIn(props) {

    // let {setToken} = props;

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    function handleSubmit(event) {
        event.preventDefault();


        // let body = {
        //     // email: email,
        //     // pw: pw
        //     email,
        //     pw
        // }

        let options = {
            // method: 'POST',
            method: 'post',
            url: '/login',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(body) = data: {email, pw}
            data: {
                email,
                pw
            }
        };
        // fetch('http://localhost:3002/login', options)
        axios(options)
        .then((res) => {
           let token = res.data.token;


           localStorage.setItem("token", token);
        //    setToken(token);
           props.setToken(token);
        //    history.push('/');

        })
        // .catch((err) => {setErrorMsg(err); console.log(Object.keys(err))});
        // .catch((err) => {setErrorMsg(err); console.log(Object.values(err))});
        .catch((err) => {
           handleError(err, setErrorMsg);
        });
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.div}>
                    <label style={styles.label}>Email</label>
                    <input name="email" type="email" placeholder="Write Your Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div style={styles.div}>
                    <label style={styles.label}>Password</label>
                    <input name="password" type="password" placeholder="Write Your Username" value={pw} onChange={(event) => setPw(event.target.value)}/>
                </div>
                <button>Send</button>
                <div>
                    <p>Don't have an account?</p>
                    <Link to="/registration">
                        <p>Registration</p>
                    </Link>
                </div>
            </form>
            <p style={{color: 'red'}}>{errorMsg}</p>
        </div>
    )
}
