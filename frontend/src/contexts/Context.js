import React, { useReducer, createContext } from 'react';

const CreateContext = (reducer, actions, initialState) => {
    const Context = createContext({});

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions = [];

        for (const key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
    };

    return { Context, Provider };
};

export default CreateContext;
