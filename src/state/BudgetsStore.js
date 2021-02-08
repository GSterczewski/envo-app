import { useReducer } from "react";

const LOAD_BUDGETS = "LOAD_BUDGETS";
const ADD_BUDGET = "ADD_BUDGET";
const DELETE_BUDGET = "DELETE_BUDGET";
const UPDATE_BUDGET = "UPDATE_BUDGET";


const budgetsReducer = (state, action) => {
  switch(action.type){

    case LOAD_BUDGETS:
      return {
        ...state,
        budgets : action.payload
      }
      
    case ADD_BUDGET:
      return{
        ...state,
        budgets: [...state.budgets, action.payload] 
      }
      case UPDATE_BUDGET:
        return {
          ...state,
          budgets: state.budgets.map(budget => budget.id === action.payload.id ? action.payload : budget)
        }
      case DELETE_BUDGET:
        return{
          ...state,
          budgets: state.budgets.filter(budget => budget.id !== action.payload)
        }
      default:
        return state
  }
}


export const useBudgetsStore = () =>{
  
  const [state, dispatch] = useReducer(budgetsReducer, { budgets: [] });
    
  const addBudget = ({id,name}) => dispatch({
    type: ADD_BUDGET,
    payload:{id,name}
  });

  const loadBudgets = budgets => dispatch({
    type: LOAD_BUDGETS,
    payload: budgets
  });

  const deleteBudget = id => dispatch({
    type: DELETE_BUDGET,
    payload: id
  });

  const updateBudget = updatedBudget => dispatch({
    type: DELETE_BUDGET,
    payload: updatedBudget
  });

  return [ state, { addBudget ,loadBudgets, deleteBudget, updateBudget } ] 
}

