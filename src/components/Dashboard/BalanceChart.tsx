import { LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer } from "recharts";
import { useApp } from "../../contexts/AppContext";

export const BalanceChart=()=>{
  const { transactions }=useApp();
  let runningBalance=0;

  const data=transactions.map((t)=>{
    runningBalance+= t.type === "income" ? t.amount : -t.amount;

    return {
      date: t.date,
      balance: runningBalance,
    };
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-4">Balance Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};