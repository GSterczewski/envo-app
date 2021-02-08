
import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import services from "services/api/index";
import { useBudgetsStore } from "./BudgetsStore";

export const StateContext = createContext(undefined);
export const StateActionsContext = createContext(undefined);


export const StateProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [budgetsState, budgetsActions] = useBudgetsStore();
  
  const state = useMemo(() => ({...budgetsState}),[budgetsState])

  const fetchAllData = useCallback(async()=>{
    try {
      const budgetsRequest = await services.budgets.getAll('gg');
      if(budgetsRequest.hasErrors){
        throw new Error(budgetsRequest.error);
      }
      setIsLoading(false);
      budgetsActions.loadBudgets(budgetsRequest.result.budgets)
      
    } catch(err){
      console.error(err)
      setIsLoading(false);
      setIsError(true);
    }
  },[budgetsActions])

  useEffect(() =>  {
    fetchAllData();
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(isLoading) return (<div>app is loading....</div>)
  if(isError) return (<div>opps something went wrong</div>)
  
  return (
    <StateContext.Provider value={state} >
      <StateActionsContext.Provider value={{...budgetsActions}}>
      {children}
      </StateActionsContext.Provider>
    </StateContext.Provider>    
  )
}