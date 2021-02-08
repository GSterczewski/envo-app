import { belongsTo, createServer, Model, RestSerializer, Factory } from "miragejs";


// eslint-disable-next-line import/no-anonymous-default-export
export default ({ enviroment = "development" } = {}) => {
  const server = createServer({
    enviroment,
    models: {
      budget: Model.extend({
        user: belongsTo()
      }),
      
      expense: Model,
      categories: Model,
      user: Model
    },
    serializers: {
      application: RestSerializer
    },
    factories:{
      category: Factory.extend({
        id(i){
          return `cat-${i+1}`
        },
        name(i){
          const names = ["bills","groceries","transport","entertainment"]
          return names[i]
        },
        icon(i){
          const icons = ["home","groceries","transport","entertainment"]
          return icons[i]
        },
        color(i){
          const colors = ["#01EDDF","#8676FD","#FEB968","#FE708B"]
          return colors[i]
        }
      })
    },
    seeds(server) {
      // eslint-disable-next-line no-unused-expressions
      server.create("budget",{
        id: "budget-1",
        category: "cat-2",
        amount:100,
        name:"groceries budget"
      })
      server.create("budget",{
        id: "budget-2",
        category: "cat-1",
        amount:240,
        name:"home bills"
      })
      server.create("expense",{
        id: "expense-1",
        category: "cat-1",
        amount:152,
        name:"electricity",
        date: "2021-01-01"
      })
      server.create("expense",{
        id: "expense-2",
        category: "cat-1",
        amount:12,
        name:"water",
        date: "2021-01-03"
      })
      server.create("expense",{
        id: "expense-3",
        category: "cat-2",
        amount:42,
        name:"shooping",
        date: "2021-01-02"
      })
      server.create("expense",{
        id: "expense-4",
        category: "cat-3",
        amount:22,
        name:"train tickets",
        date: "2021-01-11"
      })
      server.create("expense",{
        id: "expense-5",
        category: "cat-4",
        amount:62,
        name:"netflix",
        date: "2021-01-21"
      })
      server.createList("category",4)
      
      
    },
    
    routes() {
      this.namespace = "api";
      this.get("/budgets/:userid", (schema) => {
        return schema.budgets.all();
        

      });
      this.post("/budgets/:userid", (schema, request) => {
        let budget = JSON.parse(request.requestBody);
         return schema.budgets.create(budget);
      
        
      });
      this.put("/budgets/:budgetId", (schema, request) => {
        const newBudget = JSON.parse(request.requestBody);
        return schema.budgets.find(request.params.budgetId).update(newBudget);
        
      });
      this.delete("/budgets/:budgetId", (schema, request) => {
        const budget = schema.budgets.find(request.params.budgetId); 
        budget.destroy()
        return budget 
        
      })
      this.get("/expenses/:userid", (schema) => {
        
        return schema.expenses.all(); 
      });
      this.post("/expenses/:userid", (schema, request) => {
        let expense = JSON.parse(request.requestBody);
         return schema.expenses.create(expense);
        
      });
      this.put("/expenses/:expenseId", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
          return schema.expenses.find(request.params.expenseId).update(attrs);
        
      });

      this.delete("/expenses/:expenseId", (schema, request) => {
        const expense = schema.expenses.find(request.params.expenseId); 
        expense.destroy()
        return expense
      })
      this.get("/categories", (schema) => {
        return schema.categories.all();
      });
      
    }
  });
  return server;
};
