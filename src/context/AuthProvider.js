import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, FacebookAuthProvider, onAuthStateChanged, updateProfile, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new FacebookAuthProvider();
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }
    const facebook = () => {
        return signInWithPopup(auth, provider)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        updateUser,
        facebook,
        signIn,
        logOut,
        setCurrentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
