import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

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
        padding: '10px'
    },
    buttonStyle: {
        width: '25px',
        height: '25px',
        textAlign: 'center'

    }
}

export default function ToDo() {
    let history = useHistory();

    let initialList = [
        {
            id: 7,
            title: "Running"
        },
        {
            id: 8,
            title: "Make Mac and Cheese"
        }
    ];
    const [input, setInput] = useState('');
    // const [allTodos, setAllTodos] = useState(initialList);
    const [allTodos, setAllTodos] = useState([]);

    // class komponensnél a componentDidMount-nak funkció alapú verziója:
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            history.push("/login");
        } 


        // fetch beépített JS funkció, amely http kéréseket (http requests) indít szerver felé
        // 2 paramétere lehet, 2-at akkor adjuk meg, amennyiben nem "get" kérést akarunk:
        // .then - az előző sornak az adatával kezdek valamit
        // 1. sor: .then - átalakítjuk json formátummá - ha ez nem történne meg, akkor csomó más felesleges adatot kapnák
        // -> nyers válaszban - ami nem json - abban van pl: 404, 400, 200...
        // 2. sor: .then - végleges formátumú adattal azt csinálok amit akarok
        // 3. sor: 
        fetch('http://localhost:3001/')
        .then((rawRes) => rawRes.json())
        // .then((rawRes) => console.log(rawRes))
        .then((res) => setAllTodos(res))

        .catch((error) => console.log(error))
        // a useEffect végén lévő üres tömb kell, hogy ne fusson a végtelenségig
    },[]);


    function handleChange(event) {
        setInput(event.target.value);
        // console.log(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (input != '') {
            let newToDoObj = {};
            newToDoObj.title = input;
            let copiedList = [...allTodos, newToDoObj];
            setAllTodos(copiedList);
            setInput('');
        }
        // console.log(allTodos);
    }

    function deleteElement(id) {
        // The filteredList will be an array:
        // allTodos[i] = el
        let filteredList = allTodos.filter((el) => el.id != id);
        setAllTodos(filteredList);

    }

    function deleteAll() {
        setAllTodos([]);
    }

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
            </form>
                {allTodos.map((el) => {
                    console.log(el);
                    return  <div style={styles.flexrow} key={el.id}>
                                <p>{el.title}</p> <button style={styles.buttonStyle} onClick={() => deleteElement(el.id)}>X</button>
                            </div>
        
                }
            )}
            <button onClick={deleteAll}>Clear all</button>
        </div>
    )
}
