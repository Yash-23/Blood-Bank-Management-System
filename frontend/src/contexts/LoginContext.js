import CreateContext from './Context';
import app from '../firebase';

function reducer(state, action) {
    switch (action.type) {
        case 'SIGN_IN': {
            return { userID: 'prashant', isLoggedIn: true };
        }
        case 'SIGN_UP': {
            return { userID: 'prashant', isLoggedIn: true };
        }
        case 'SIGN_OUT': {
            return { isLoggedIn: false };
        }
        default: {
            throw new Error(action.type + ' <= Is Unknown action type ');
        }
    }
}

function signIn(dispatch) {
    return (email, password) => {
        dispatch({ type: 'SIGN_IN', payload: { email, password } });
    };
}

function signUp(dispatch) {
    return (firstName, lastName, email, password) => {
        dispatch({
            type: 'SIGN_UP',
            payload: {
                firstName,
                lastName,
                email,
                password,
            },
        });
    };
}

function signOut(dispatch) {
    return () => {
        dispatch({ type: 'SIGN_OUT' });
    };
}

export const { Context, Provider } = CreateContext(reducer, [signIn, signUp, signOut], []);
