import React from "react";


const Budget = ({id,name,category,amount}) => (<li key={id}>{name} - {category} - {amount}PLN</li>)
export default function BudgetsList({budgets}){
  
  return (<ul>
    {budgets.map(budget => (
      <Budget key={budget.id} {...budget} />
    ))}
  </ul>)
}