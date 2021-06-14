import React from 'react';


const styles = {
    container: {
        width: '100%',
        height: '80px',
        // backgroundColor: 'rgb(255, 157, 157)',
        display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        flexDirection: 'row',
    },
    buttonLogOut: {
        height: '60px',
        cursor: 'pointer',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'rgb(255, 103, 103)',
        borderRadius: '0.8rem',
        border: 'none',
        padding: '20px',
        marginRight: '20px'
    }
}

export default function Navbar(props) {

    

    return (
        <div style={styles.container}>
            <button style={styles.buttonLogOut} onClick={() => props.handleLogOut()}>Log out</button>
        </div>
    )
}
