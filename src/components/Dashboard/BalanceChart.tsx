import { LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer, CartesianGrid } from "recharts";
import { useApp } from "../../contexts/AppContext";

export const BalanceChart=()=>{
  const { transactions }=useApp();
  const isDark=document.documentElement.classList.contains("dark");
  const axisColor=isDark ? "#d1d5db" : "#6b7280";
  const gridColor=isDark ? "#374151" : "#e5e7eb";
  const tooltipBg=isDark ? "#111827" : "#ffffff";
  const tooltipText=isDark ? "#f9fafb" : "#111827";
  const lineColor=isDark ? "#818cf8" : "#4f46e5";

  let runningBalance=0;

  const data=transactions.map((t)=>{
    runningBalance+= t.type === "income" ? t.amount : -t.amount;

    return {
      date: t.date,
      balance: runningBalance,
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-4 dark:text-gray-300">Balance Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke={axisColor} tick={{ fill:axisColor,fontSize:12 }} />
          <YAxis stroke={axisColor} tick={{ fill:axisColor,fontSize:12 }}/>

          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: "none",
              borderRadius: "8px",
              color: tooltipText,
            }}
            labelStyle={{ color: tooltipText }}
          />

          <Line type="monotone" dataKey="balance" stroke={lineColor} strokeWidth={2} dot={{ r:3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};