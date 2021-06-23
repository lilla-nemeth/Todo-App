import React from 'react';


export default function Navbar(props) {
    const { user } = props;

    return (
        <div className="navbar">
                <div className="navbarWelcomeBox">
                    <p>Hi {user}!</p>
                </div>
                <div className="navbarTodoBox">
                    <h3>Todo</h3>
                </div>
                <div className="navbarLogOutBox">
                    <button className="buttonLogOut" onClick={() => props.handleLogOut()}>Log out</button>
                </div>
        </div>
    )
}
