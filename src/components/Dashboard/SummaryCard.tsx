import { useApp } from "../../contexts/AppContext";

export const SummaryCards=()=>{
  const {transactions}=useApp();
  const income=transactions.filter((t)=>t.type==="income").reduce((acc,t) => acc + t.amount,0);
  const expenses=transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  const balance=income-expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      <Card title="Balance" value={balance} />
      <Card title="Income" value={income} />
      <Card title="Expenses" value={expenses} />
      
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">₹{value}</h2>
  </div>
);