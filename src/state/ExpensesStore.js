import { useReducer } from "react";


const LOAD_EXPENSES = "LOAD_EXPENSES";
const ADD_EXPENSE = "ADD_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";
const UPDATE_EXPENSE = "UPDATE_EXPENSE";


const expensesReducer = (state, action) => {
  
  switch(action.type){
    
    case LOAD_EXPENSES:
      return {
        ...state,
        expenses : action.payload
      }
      
    case ADD_EXPENSE:
      return{
        ...state,
        expenses: [...state.expenses, action.payload] 
      }
      case UPDATE_EXPENSE:
        return {
          ...state,
          expenses: state.expenses.map(expense => expense.id === action.payload.id ? action.payload : expense)
        }
      case DELETE_EXPENSE:
        return{
          ...state,
          expenses: state.expenses.filter(expense => expense.id !== action.payload)
        }
      default:
        return state
  }
}


export const useExpensesStore = () =>{
  
  const [state, dispatch] = useReducer(expensesReducer, { expenses: [] });
    
  const addExpense = ({id,name}) => dispatch({
    type: ADD_EXPENSE,
    payload:{id,name}
  });

  const loadExpenses = expenses => dispatch({
    type: LOAD_EXPENSES,
    payload: expenses
  });

  const deleteExpense = id => dispatch({
    type: DELETE_EXPENSE,
    payload: id
  });

  const updateExpense = updatedExpense => dispatch({
    type: DELETE_EXPENSE,
    payload: updatedExpense
  });

  return [ state, { addExpense ,loadExpenses, deleteExpense, updateExpense } ] 
}
