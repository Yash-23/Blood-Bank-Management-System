import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase';
import BackendApi from '../apis/backendApi';
import User from '../models/user';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const googleSignInProvider = new firebase.auth.GoogleAuthProvider();

    function signInWithGoogle() {
        return auth.signInWithPopup(googleSignInProvider);
    }

    function signUp(email, password, firstName, lastName) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function forgotPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function signOut() {
        return auth.signOut();
    }

    function dbUserCreate(user) {
        BackendApi({
            method: 'POST',
            url: `/api/user/${user.userId}`,
            data: user,
        });
    }

    function dbUserGet(userId) {
        BackendApi({
            method: 'GET',
            url: `/api/user/${userId}`,
        }).then(({ data }) => {
            setCurrentUser(data);
        });
    }

    useEffect(() => {
        return auth.onAuthStateChanged((authUser) => {
            setCurrentUser(authUser ? new User(authUser) : null);
            setLoading(false);
        });
    }, []);

    const value = {
        currentUser,
        logIn,
        signUp,
        signOut,
        signInWithGoogle,
        forgotPassword,
        dbUserCreate,
        dbUserGet,
    };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
