import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { handleError } from './HelperFunctions.js'; 
import createHistory from 'history/createBrowserHistory';
import ToDoInput from './ToDoInput.js';
import ToDoElement from './ToDoElement.js';
import SortingButtons from './SortingButtons.js';

export const order = {
    date: 'Date',
    importance: 'Importance',
    completed: 'Status'
}

export default function ToDo(props) {

    const [allTodos, setAllTodos] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [orderBy, setOrderBy] = useState(order.date);
    const [loading, setLoading] = useState(true);

    function getAllTodos () {
        let options = {
            method: 'get',
            url: '/todos',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token
            }
        };
        axios(options)
        .then((res) => {
            setLoading(false); 
            setAllTodos(res.data)
        })
        .catch((err) => {handleError(err, setErrorMsg); console.log(err)});
    }

    useEffect(() => { 
        createHistory().replace('/');
        getAllTodos();
    },[]);

    
    let sortedAllTodos = allTodos.sort((a, b) => {
        // console.log(a, b)
        if (orderBy === order.date) {
            return a.created.valueOf() < b.created.valueOf() ? 1 : -1;
        } else if (orderBy === order.importance) {
            return a.importance < b.importance ? 1 : -1;
        } else if (orderBy === order.completed) {
            return a.completed < b.completed ? 1 : -1;
        }
    });


    if (loading) {
        return <div className="loaderContainer">
            <svg className="loader">
                <circle className="loaderCircle" cx="35" cy="35" r="35"></circle>
            </svg>
        </div>
    }

    // function deleteAll() {
    //     setAllTodos([]);
    // }

    return (
        <main className="todoMain">
            <section className="todoContainer">
                <ToDoInput 
                    getAllTodos={() => getAllTodos()}
                    token={props.token}
                /> 
                    <SortingButtons setOrderBy={setOrderBy} />

                    {sortedAllTodos.map((el) => {
                        return <ToDoElement getAllTodos={() => getAllTodos()} el={el} token={props.token}/>
                    }
                )}
                {/* <button onClick={deleteAll}>Delete all</button> */}
            </section>
        </main>
    )
}
