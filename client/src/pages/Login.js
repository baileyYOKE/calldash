// src/pages/Login.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

function Login() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div>
            {!loggedIn ? (
                <LoginForm setLoggedIn={setLoggedIn} />
            ) : (
                <p>You are logged in!</p>
            )}
        </div>
    );
}

export default Login;
