import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer } from "recharts";
import { useApp } from "../../contexts/AppContext";

const COLORS=["#4f46e5","#22c55e","#f59e0b","#ef4444"];

export const CategoryChart=()=>{
  const { transactions }=useApp();
  const categoryMap: Record<string,number>={};

  transactions.forEach((t)=>{
    if (t.type === "expense"){
      categoryMap[t.category]=(categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data=Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4 dark:text-gray-300">Spending Breakdown</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};