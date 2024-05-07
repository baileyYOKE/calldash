import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header>
      <h1>Welcome to Our App</h1>
      <nav>
        <Link to="/">Home</Link>
        {currentUser ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
