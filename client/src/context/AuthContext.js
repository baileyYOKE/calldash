import { createContext, useContext, useEffect, useState } from 'react';
import auth from '../firebaseConfig'; // Adjust the path as necessary
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return unsubscribe; // This function is called on component unmount
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    const value = {
        currentUser,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
