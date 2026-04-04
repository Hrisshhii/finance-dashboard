import { useState } from "react";
import { useApp } from "../../contexts/AppContext";

export const TransactionsTable=()=>{
  const { transactions,role,deleteTransaction }=useApp();

  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState<"all"|"income"|"expense">("all");

  const filtered=transactions.filter((t)=>t.category.toLowerCase().includes(search.toLowerCase()))
    .filter((t)=>(filter === "all" ? true : t.type === filter));

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex flex-col md:flex-row gap-4 my-4">
        
        <input type="text" value={search} placeholder="Search category..."
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              {role === "admin" && <th className="p-2">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{t.date}</td>
                  <td className="p-2">{t.category}</td>
                  <td className="p-2 capitalize">{t.type}</td>
                  <td className="p-2">₹{t.amount}</td>

                  {role === "admin" && (
                    <td className="p-2 space-x-2">
                      <button className="text-blue-500">Edit</button>
                      <button onClick={()=>deleteTransaction(t.id)} className="text-red-500">Delete</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};