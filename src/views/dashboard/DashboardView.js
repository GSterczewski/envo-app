

const DashboardCard = ({icon,title,content}) => (
  <div>
    <p>{icon}</p>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
)

const DashboardExpensesTable = ({expenses}) => (
    <div>
    <h3>Last expenenses</h3>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Title</th>
        <th>Category</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map(expense => (
        <tr key={expense.id}>
          <td>{expense.date}</td>
          <td>{expense.title}</td>
          <td>{expense.category}</td>
          <td>{expense.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
)
const DashboardView = () => {
  const dummyExpenses = [{
    id: "expense-1",
    date: "12.02.2021",
    title:"condoms",
    category:"sex",
    amount: 1234
  }]
  return (
    <>
    <h1>Dashboard</h1>
      <DashboardCard icon="credit" title="Total expenses" content="123PLN" />
      <DashboardCard icon="wallet" title="Total budget" content="623PLN" />
      <DashboardCard icon="wallet" title="Balance" content="+323PLN" />
      <DashboardExpensesTable expenses={dummyExpenses} />
    </>
  )
};


export default DashboardView;
