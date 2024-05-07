import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary

const Footer = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
        await logout();
        window.location.reload(); // Forces the page to reload
    } catch (error) {
        console.error("Failed to logout:", error);
    }
};



  return (
    <footer>
      <p>© SweatyDev Inc. All rights reserved.</p>
      {currentUser && (
        <>
          <p>Logged in as: {currentUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </footer>
  );
};

export default Footer;
