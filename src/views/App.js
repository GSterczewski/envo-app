import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { BudgetsProvider } from "state/BudgetsStore";
import mockServer from "./mirageServer";

import DashboardView from "views/dashboard/DashboardView";
import BudgetsView from "views/budgets/BudgetsView";
import Layout from "components/layout/Layout";

mockServer();

function App() {
  
  return (
    <div className="App">
      <Router>
      <Layout>
          <Switch>
            <Route path="/home" exact>
              <DashboardView />
            </Route>
            <Route path="/expenses" exact>
              <h1>Expenses</h1>
            </Route>
            <Route path="/stats" exact>
              <h1>Statistics</h1>
            </Route>
           <Route path="/budgets">
             <BudgetsProvider>
               <BudgetsView/>
             </BudgetsProvider>
           </Route>
          </Switch>
      </Layout>
      </Router>
    </div>
  );
}

export default App;
