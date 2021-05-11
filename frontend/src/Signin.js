import React from 'react';

const styles = {
    div: {
        marginBottom: '20px',
    },
    label: {
        display: 'inline-block',
        width: '100px',
    },
}

export default function SignIn() {
    return (
        <div>
            <h2>Sign In</h2>
            <form>
                <div style={styles.div}>
                    <label style={styles.label}>Email</label>
                    <input name="email" type="email"/>
                </div>
                <div style={styles.div}>
                    <label style={styles.label}>Password</label>
                    <input name="password" type="password"/>
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}
