import { useState } from "react";
import { BalanceChart } from "./components/Dashboard/BalanceChart";
import { CategoryChart } from "./components/Dashboard/CategoryChart";
import { SummaryCards } from "./components/Dashboard/SummaryCard";
import { Insights } from "./components/Insights/Insights";
import { Layout } from "./components/Layout";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { AddTransaction } from "./components/Transactions/AddTransaction";
import { TransactionsTable } from "./components/Transactions/TransactionsTable";

function App() {
  const [active,setActive]=useState("Dashboard");
  return (
    <Layout active={active} setActive={setActive}>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold dark:text-white">{active}</h1>
        <RoleSwitcher />
      </div>

      {active==="Dashboard" && (
        <>
          <SummaryCards/>
          <BalanceChart/>
          <CategoryChart/>
        </>
      )}
      
      {active==="Transactions" && (
        <>
          <AddTransaction/>
          <TransactionsTable/>
        </>
      )}
      
      {active==="Insights" && (
        <>
          <Insights/>
        </>
      )}
      
    </Layout>
  );
}

export default App;