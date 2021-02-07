import React, { useMemo, useState, useEffect, useContext } from "react";
import BudgetsList from "views/budgets/components/BudgetsList";
import { BudgetsContext, BudgetsActionsContext } from "state/BudgetsStore";
export default function BudgetsView(){
    
  const { budgets } = useContext(BudgetsContext);
  const { addBudget } = useContext(BudgetsActionsContext);

  const [budgetsToShow, setBudgetsToShow] = useState( budgets.reduce((budgets, currentBudget) => Object.assign(budgets,{[currentBudget.id] : true }), {}));
  const filteredBudgets = useMemo(()=> budgets.filter(budget => budgetsToShow[budget.id]), [budgets,budgetsToShow]);
  useEffect(()=>{
    setBudgetsToShow(budgets.reduce((budgets, currentBudget) => Object.assign(budgets,{[currentBudget.id] : true }), {}))
  },[budgets])
  return (
    <>
    <h1>Budgets View</h1>
    <BudgetsList budgets={filteredBudgets} />
    <button onClick={() => addBudget({id:"budget-3",name:"new budget"})}>Add budget</button>
    </>
  )
}