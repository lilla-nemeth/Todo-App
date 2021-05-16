import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { handleError } from './HelperFunctions.js'; 

const styles = {
    // container: {
    //     backgroundColor: '#daeddf', 
    //     display: 'flex',
    //     flexDirection: 'column',
    //     padding: '1rem',
    // },
    form: {
        backgroundColor: '#daeddf', 
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
    },
    flexrow: {
        backgroundColor: '#daeddf', 
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        alignItems: 'center'
    },
    completed: {
        backgroundColor: '#daeddf', 
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        textDecoration: 'line-through'
    },
    buttonStyle: {
        width: '25px',
        height: '25px',
        textAlign: 'center'
    },
    editStyle: {
        width: '50px',
        height: '25px',
        textAlign: 'center'
    }
}

export default function ToDo(props) {
    const [input, setInput] = useState('');
    const [allTodos, setAllTodos] = useState([]);
    const [editedTodoId, setEditedTodoId] = useState(null);
    const [editedTodoInput, setEditedTodoInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // fetch all todos:
    function getAllTodos () {
        let options = {
            method: 'get',
            url: 'http://localhost:3002/',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token
            }
        };

        axios(options)
        .then((res) => setAllTodos(res.data))
        .catch((err) => handleError(err, setErrorMsg));
    }

        // TODO:
        // let usePathname = () => {
        //     let windowLocation = useLocation();
        //     console.log(useLocation);
        //     return windowLocation.pathname;
        // }
        // usePathname();

    // class komponensnél a componentDidMount-nak funkció alapú verziója:
    useEffect(() => {

        // fetch beépített JS funkció, amely http kéréseket (http requests) indít szerver felé
        // 2 paramétere lehet, 2-at akkor adjuk meg, amennyiben nem "get" kérést akarunk:
        // .then - az előző sornak az adatával kezdek valamit
        // 1. sor: .then - átalakítjuk json formátummá - ha ez nem történne meg, akkor csomó más felesleges adatot kapnák
        // -> nyers válaszban - ami nem json - abban van pl: 404, 400, 200...
        // 2. sor: .then - végleges formátumú adattal azt csinálok amit akarok
        // 3. sor: 

        // fetch('http://localhost:3001/')
        // .then((rawRes) => rawRes.json())
        // // .then((rawRes) => console.log(rawRes))
        // .then((res) => setAllTodos(res))

        // .catch((error) => handleError(err, setErrorMsg))
        // a useEffect végén lévő üres tömb kell, hogy ne fusson a végtelenségig

        getAllTodos();



    },[]);


    function handleChange(event) {
        setInput(event.target.value);
        // console.log(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        let options = {
            method: 'post',
            url: 'http://localhost:3002/',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token
            },
            data: {
                title: input
            }
        }

        if (input != '') {
            axios(options)
            // .then((res) => setAllTodos([...allTodos,...res.data]))
            .then((res) => getAllTodos())
            .catch((err) => handleError(err, setErrorMsg));
        }
        setInput('');
    }

    function deleteElement(id) {

        let options = {
            method: 'delete',
            url: `http://localhost:3002/${id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token
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
            url: `http://localhost:3002/${el.id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token
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
        // in case when we click Edit 2X
        if (editedTodoId == el.id) {
            setEditedTodoId(null);
            setEditedTodoInput('');       
        } else {
            // every other normal case
            setEditedTodoId(el.id);
            setEditedTodoInput(el.title);
        }
    }



    // we call this function, when the text edit is done
    function editTodo (el, event) {
        event.preventDefault();

        let options = {
            method: 'put',
            url: `http://localhost:3002/${el.id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token
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

    // function deleteAll() {
    //     setAllTodos([]);
    // }

    // console.log(allTodos);
    let sortedAllTodos = allTodos.sort((a, b) => {
        return a.created.valueOf() < b.created.valueOf() ? 1 : -1;
    });
    console.log(sortedAllTodos);

    return (
        <div>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label>Todo</label>
                <input 
                    type="text"
                    placeholder="add to do"
                    value={input}
                    onChange={handleChange}
                />
                <p style={{color: 'red'}}>{errorMsg}</p>
            </form>
                {sortedAllTodos.map((el) => {
                    // console.log(el);
                    return  <div style={{...styles.flexrow,...{border: el.id == editedTodoId ? '1.5px solid green' : null}}} key={el.id}>
                                <input  
                                    type="checkbox" 
                                    checked={el.completed} 
                                    onChange={() => completeTodo(el)} 
                                />
                                {editedTodoId != el.id 
                                ? <p style={el.completed ? styles.completed : styles.flexrow}>{el.title}</p> 
                                : <form onSubmit={(event) => editTodo(el, event)}>
                                    <input 
                                        type="text" 
                                        value={editedTodoInput}
                                        onChange={(event) => setEditedTodoInput(event.target.value)}
                                    />
                                  </form>
                                }
                                <div>
                                    <button 
                                        style={styles.editStyle} 
                                        onClick={() => selectToEdit(el)}>
                                        Edit
                                    </button>
                                    <button 
                                        style={styles.buttonStyle} 
                                        onClick={() => deleteElement(el.id)}>
                                        X
                                    </button>
                                </div>
                            </div>
                }
            )}
            {/* <button onClick={deleteAll}>Delete all</button> */}
        </div>
    )
}
