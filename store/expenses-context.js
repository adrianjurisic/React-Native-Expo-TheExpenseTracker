import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair od shoes',
        amount: 159.99,
        date: new Date('2024-12-19')
    },
    {
        id: 'e2',
        description: 'Milk',
        amount: 2.99,
        date: new Date('2024-12-21')
    },
    {
        id: 'e3',
        description: 'Coffee',
        amount: 2,
        date: new Date('2024-12-25')
    },
    {
        id: 'e4',
        description: 'Bus ticket',
        amount: 19.75,
        date: new Date('2024-12-28')
    },
    {
        id: 'e5',
        description: 'Food',
        amount: 39.95,
        date: new Date('2024-12-31')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: ({id}) => {},
    updateExpense: ({id, description, amount, date}) => {},
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload}, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return(
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;