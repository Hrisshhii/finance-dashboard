import { useState } from "react";
import { useApp } from "../../contexts/AppContext";

export const AddTransaction=()=>{
  const { setTransactions,transactions,role }=useApp();

  const [form,setForm]=useState({amount: "",category: "",type: "expense",});
  if (role !== "admin") return null;

  const handleAdd=()=>{
    if (!form.amount || !form.category) return;

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        amount: Number(form.amount),
        category: form.category,
        type: form.type as any,
      },
    ]);

    setForm({ amount: "", category: "", type: "expense" });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow my-4">
      <h2 className="font-semibold mb-2">Add Transaction</h2>

      <div className="flex flex-col md:flex-row gap-2">
        <input placeholder="Amount" value={form.amount}
          onChange={(e)=>setForm({ ...form, amount: e.target.value })}
          className="border p-2 rounded"
        />

        <input placeholder="Category" value={form.category}
          onChange={(e)=>setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        />

        <select value={form.type}
          onChange={(e)=>setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button onClick={handleAdd} className="bg-indigo-500 text-white px-4 rounded">
          Add
        </button>
      </div>
    </div>
  );
};