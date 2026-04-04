import { useApp } from "../../contexts/AppContext";

export const Insights=()=>{
  const { transactions }=useApp();
  const expenses = transactions.filter((t)=>t.type === "expense");
  const categoryMap: Record<string,number>={};

  expenses.forEach((t)=>{
    categoryMap[t.category]=(categoryMap[t.category] || 0) + t.amount;
  });

  const highestCategory=Object.entries(categoryMap).sort(
    (a, b)=>b[1]-a[1]
  )[0];

  const currentMonth=new Date().getMonth();
  const lastMonth=currentMonth-1;

  const currentMonthTotal=expenses.filter((t) => new Date(t.date).getMonth() === currentMonth)
    .reduce((acc, t) => acc + t.amount, 0);

  const lastMonthTotal=expenses.filter((t) => new Date(t.date).getMonth() === lastMonth)
    .reduce((acc, t) => acc + t.amount, 0);

  const difference=currentMonthTotal-lastMonthTotal;

  const freqMap: Record<string,number>={};

  expenses.forEach((t)=>{
    freqMap[t.category]=(freqMap[t.category] || 0) + 1;
  });

  const mostFrequent=Object.entries(freqMap).sort(
    (a,b) => b[1]-a[1]
  )[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      
      <InsightCard title="Top Spending Category"
        value={ highestCategory ? `${highestCategory[0]} (₹${highestCategory[1]})` : "No data"}
      />

      <InsightCard title="Monthly Spending Change"
        value={ difference >= 0 ? `⬆ ₹${difference} more than last month` : `⬇ ₹${Math.abs(difference)} less than last month`}
      />

      <InsightCard title="Most Frequent Category"
        value={mostFrequent ? mostFrequent[0] : "No data"}
      />
      
    </div>
  );
};

type InsightProps={
  title:string;
  value:string;
};

const InsightCard=({title,value}:InsightProps)=>(
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-lg font-semibold">{value}</h2>
  </div>
);