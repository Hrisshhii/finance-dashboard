import { BalanceChart } from "./components/Dashboard/BalanceChart";
import { CategoryChart } from "./components/Dashboard/CategoryChart";
import { SummaryCards } from "./components/Dashboard/SummaryCard";
import { Layout } from "./components/Layout";
import { RoleSwitcher } from "./components/RoleSwitcher";

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
    </Layout>
  );
}

export default App;