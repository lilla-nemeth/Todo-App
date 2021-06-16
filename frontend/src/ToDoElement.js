import axios from 'axios';
import React, { useState } from 'react';
import Sugar from 'sugar';
import { handleError } from './HelperFunctions.js'; 
import Dropdown from './Dropdown.js';
import Tooltip from './Tooltip.js';
import { ReactComponent as PencilIcon } from './assets/icons/pencil.svg';
import { ReactComponent as TrashIcon } from './assets/icons/trash_can.svg';
import { ReactComponent as CalendarIcon } from './assets/icons/calendar.svg';



export default function ToDoElement(props) {
    const [allTodos, setAllTodos] = useState([]);
    const [editedTodoId, setEditedTodoId] = useState(null);
    const [editedTodoInput, setEditedTodoInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { getAllTodos, token, el } = props;

    function deleteElement(id) {
        let options = {
            method: 'delete',
            url: `/todos/${id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            data: {
                title: allTodos
            }
        }

        axios(options)
        .then((res) => getAllTodos())
        .catch((err) => handleError(err, setErrorMsg));

        // The filteredList will be an array:
        // allTodos[i] = el
        // let filteredList = allTodos.filter((el) => el.id != id);
        // setAllTodos(filteredList);
    }

    function completeTodo (el) {

        let options = {
            method: 'put',
            url: `/todos/${el.id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            data: {
                title: el.title,
                completed: el.completed ? false : true,
                importance: el.importance
            }
        }

        axios(options)
        .then((res) => getAllTodos())
        .catch((err) => handleError(err, setErrorMsg));
    }

    function selectToEdit (el) {
        if (editedTodoId == el.id) {
            setEditedTodoId(null);
            setEditedTodoInput('');       
        } else {
            setEditedTodoId(el.id);
            setEditedTodoInput(el.title);
        }
    }

    function editTodo (el, event) {
        event.preventDefault();

        let options = {
            method: 'put',
            url: `/todos/${el.id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            data: {
                title: editedTodoInput,
                completed: el.completed,
                importance: el.importance
            }
        }

        axios(options)
        .then((res) => {getAllTodos(); setEditedTodoId(null); setEditedTodoInput('')})
        .catch((err) => handleError(err, setErrorMsg));
    }

    function updateImportance(el, number) {
        let options = {
            method: 'put',
            url: `/todos/${el.id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            data: {
                title: el.title,
                completed: el.completed,
                importance: number
            }
        }

        axios(options)
        .then((res) => getAllTodos())
        .catch((err) => handleError(err, setErrorMsg));
    }

    let sugarDate = Sugar.Date.create(el.created);
    let formattedDate = Sugar.Date.format(sugarDate, '{dd}/{MM}/{yyyy}');
    let formattedTime = Sugar.Date.format(sugarDate, '{HH}:{mm}:{ss}');


    return  (
        <div className="flexrow"
             key={el.id}> 
            <label className="checkBoxContainer">
                <input  
                    type="checkbox" 
                    checked={el.completed} 
                    onChange={() => completeTodo(el)} 
                />
                <span class="checkmark"></span>
            </label>
            {editedTodoId != el.id 
                ? 
                <div className="titleContainer">
                    <p className={el.completed ? "completed" : "flexrow"}>
                        {el.title}
                    </p>
                </div>
                : 
                <form className="form" onSubmit={(event) => editTodo(el, event)}>
                    <input 
                        type="text" 
                        value={editedTodoInput}
                        onChange={(event) => setEditedTodoInput(event.target.value)}
                    />
                </form>
            }
            <Dropdown 
                value={el.importance} 
                isCompleted={el.completed}
                changeImportance={(num) => {updateImportance(el, num)}}
            />
            <div className="buttonListStyle">
                <button 
                    className="buttonEditStyle" 
                    onClick={() => selectToEdit(el)}>
                    <PencilIcon className="iconStyle"/>   
                </button>
                <button 
                    className="buttonDeleteStyle" 
                    onClick={() => deleteElement(el.id)}>
                    <TrashIcon className="iconStyle"/>  
                </button>
                <Tooltip date={formattedDate} time={formattedTime}>
                    <button 
                        className="buttonCalendarStyle"
                    >
                        <CalendarIcon className="iconStyle"/>  
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}
