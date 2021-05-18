import React from 'react';

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_EXPENSES":
            return {
                ...state,
                expenses: action.payload
            }
        case "ADD_EXPENSE":
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }
        case "UPDATE_EXPENSE":
            return{
                ...state,
                expenses: state.expenses.map(expense => expense._id === action.payload._id ? action.payload : expense)
            }
            case "DELETE_EXPENSE":
            return{
                ...state,
                expenses: state.expenses.filter(expense => expense._id === action.payload)
            }
        default:
            return state
    }
}

const initialState = {
    username: '',
    expenses: [
    // {
    //     expenseId: '',
    //     description: '',
    //     amount: undefined,
    //     date: ''
    // }
    ]
}

const ExpenseContext = React.createContext(undefined);

const ExpenseProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = { expState: state, expDispatch: dispatch }

    return (
        <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
    )
}

function useExpense() {
    const context = React.useContext(ExpenseContext)
    if(context === undefined) {
        throw new Error("Use Expense must be used within an Expense Provider")
    }
    return context
}

export {ExpenseProvider, useExpense}