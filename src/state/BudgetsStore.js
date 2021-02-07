import { useReducer, createContext, useEffect, useState } from "react";
import services from "services/api/index";

const LOAD_BUDGETS = "LOAD_BUDGETS";
const ADD_BUDGET = "ADD_BUDGET";
const REMOVE_BUDGET = "REMOVE_BUDGET";




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
      case REMOVE_BUDGET:
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

  return [ state, { addBudget ,loadBudgets } ] 
}

export const BudgetsContext = createContext(undefined);
export const BudgetsActionsContext = createContext(undefined);

export const BudgetsProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, actions] = useBudgetsStore();
  
  useEffect(()=>{
    services.budgets.getAll(1).then(result => {
     
      setIsLoading(false);
      actions.loadBudgets(result.budgets);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(isLoading) return (<div>app is loading....</div>)
  return (
    <BudgetsContext.Provider value={state} >
      <BudgetsActionsContext.Provider value={actions}>
      {children}
      </BudgetsActionsContext.Provider>
    </BudgetsContext.Provider>    
  )
}