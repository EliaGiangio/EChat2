import React, { createContext, useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const auth = getAuth();
    const database = getDatabase();

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user); // Set the user state directly
            alert("Logged in successfully");
            return true;
        } catch (error) {
            const errorMessage = error.message;
            alert(errorMessage);
            return false;
        }
    };


    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await set(ref(database, 'users/' + user.uid), {
                user_id: user.uid,
                email: email,
                password: password,
                chatId: Math.random().toString(36).slice(2),
                last_login: Date.now(),
                username: email
            });
            setUser(user);
            alert("User created correctly");
            return true;
        } catch (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        }
    };

    const logout = () => {
        auth.signOut()
            .then(() => {
                setUser(null);
                // Redirect after logout (replace with your routing logic)
                window.location.replace('/');
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

