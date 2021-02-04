/* eslint-disable no-undef */
import ExpensesActions from "./ExpensesActions";


describe("ExpensesActions", ()=>{
    const actions = new ExpensesActions();
    testApiFetchActions(actions, "expenses");
    testApiCrudActions(actions,"expenses","EXPENSE","create");
    testApiCrudActions(actions,"expenses","EXPENSE","update");
    testApiCrudActions(actions,"expenses","EXPENSE","delete");
 
  
})