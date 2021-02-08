import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { StateProvider } from "state/StateProvider";
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
             <StateProvider>
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
               <BudgetsView/>
           </Route>
          </Switch>
             </StateProvider>
      </Layout>
      </Router>
    </div>
  );
}

export default App;
