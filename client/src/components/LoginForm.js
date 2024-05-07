// src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../firebaseConfig';  // Adjust path as necessary

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      // Redirect to dashboard or another internal page
      navigate('/dashboard');  // Redirecting user to dashboard page after login
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
