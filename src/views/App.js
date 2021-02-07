import React from "react";
import { BudgetsProvider } from "state/BudgetsStore";
import 'views/App.css';
import BudgetsView from "views/budgets/BudgetsView";
import mockServer from "./mirageServer";
mockServer();

function App() {
  
  return (
    <div className="App">
      <BudgetsProvider>
        <BudgetsView/>
      </BudgetsProvider>
    </div>
  );
}

export default App;
