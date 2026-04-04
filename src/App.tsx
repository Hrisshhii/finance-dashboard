import { BalanceChart } from "./components/Dashboard/BalanceChart";
import { CategoryChart } from "./components/Dashboard/CategoryChart";
import { SummaryCards } from "./components/Dashboard/SummaryCard";
import { Insights } from "./components/Insights/Insights";
import { Layout } from "./components/Layout";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { AddTransaction } from "./components/Transactions/AddTransaction";
import { TransactionsTable } from "./components/Transactions/TransactionsTable";

function App() {
  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <RoleSwitcher />
      </div>

      <SummaryCards/>
      <BalanceChart/>
      <CategoryChart/>

      <AddTransaction/>
      <TransactionsTable/>

      <Insights/>
    </Layout>
  );
}

export default App;