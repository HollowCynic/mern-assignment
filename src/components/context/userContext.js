import React from 'react';

const reducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            return {
                ...state,        
                username: action.payload.username,
                id: action.payload.id,
                isAuthenticated: true
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                username: '',
                id: '',
                isAuthenticated: false
            }
        default:
            return state
    }
}

const initialState = {
    username: '',
    id: '',
    isAuthenticated: false
}

const UserContext = React.createContext(undefined);

const UserProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = { state, dispatch }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}

function useUser() {
    const context = React.useContext(UserContext)
    if(context === undefined) {
        throw new Error("Use User must be used within a User Provider")
    }
    return context
}

export {UserProvider, useUser}