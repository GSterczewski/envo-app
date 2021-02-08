
import React, { useMemo, useState, useEffect, useContext } from "react";
import BudgetsList from "views/budgets/components/BudgetsList";
import { StateContext, StateActionsContext } from "state/StateProvider";

export default function BudgetsView(){
    
  const { budgets } = useContext(StateContext);
  const { addBudget } = useContext(StateActionsContext);

  const [budgetsToShow, setBudgetsToShow] = useState([]);
  
  const filteredBudgets = useMemo(()=> budgets && budgets.length ? budgets.filter(budget => budgetsToShow[budget.id]) : [], [budgets,budgetsToShow] );

  useEffect(()=>{
    console.log(budgets)
    if(budgets && budgets.length){
      setBudgetsToShow(budgets.reduce((budgets, currentBudget) => Object.assign(budgets,{[currentBudget.id] : true }), {}))
    }
  },[budgets])
  
  return (
    <>
    <h1>Budgets View</h1>
    <BudgetsList budgets={filteredBudgets} />
    <button onClick={() => addBudget({id:"budget-3",name:"new budget"})}>Add budget</button>
    </>
  )
}