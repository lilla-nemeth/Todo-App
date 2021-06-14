import React, {useState} from 'react';
import axios from 'axios';
import { handleError } from './HelperFunctions.js'; 


export default function ToDoInput(props) {
    const [input, setInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // const [loading, setLoading] = useState(false);

    const { getAllTodos, token } = props;

    function handleChange(event) {
        setInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        let options = {
            method: 'post',
            url: '/todos',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            data: {
                title: input
            }
        }

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
                <h3>Todo</h3>
                <input 
                    type="text"
                    placeholder="Add to do"
                    value={input}
                    onChange={handleChange}
                />
                <p style={{color: 'red'}}>{errorMsg}</p>
            </form>
        </div>
    )
}
