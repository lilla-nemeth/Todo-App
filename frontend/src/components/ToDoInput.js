import React, { useState } from 'react';
import axios from 'axios';
import { handleError, handleChange } from '../utils/HelperFunctions';

export default function ToDoInput(props) {
    const { getAllTodos, token } = props;

    const [input, setInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        let options = {
            method: 'post',
            url: '/todos',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            data: {
                title: input,
            },
        };
        if (input != '') {
            axios(options)
                .then((res) => getAllTodos())
                .catch((err) => handleError(err, setErrorMsg));
        }
        setInput('');
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add todo"
                    value={input}
                    className="todoInput"
                    onChange={(e) => handleChange(e, setInput)}
                />
                <p className="errorMsg">{errorMsg}</p>
            </form>
        </div>
    );
}
