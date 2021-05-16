import React from 'react';


const styles = {
    container: {
        width: '100%',
        height: '2rem',
        backgroundColor: 'blue',
        color: 'white'
    }
}

export default function Navbar(props) {

    

    return (
        <div style={styles.container}>
            <button onClick={() => props.handleLogOut()}>Log out</button>
        </div>
    )
}
