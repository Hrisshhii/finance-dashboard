import { useState } from "react";
import { useApp } from "../../contexts/AppContext";

export const TransactionsTable=()=>{
  const { transactions,role,deleteTransaction,updateTransaction }=useApp();

  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState<"all"|"income"|"expense">("all");
  const [editingId,setEditingId]=useState<number|null>(null);
  const [editForm,setEditForm]=useState({
    amount:"",
    category:"",
    type:"expense"
  })

  const filtered=transactions.filter((t)=>t.category.toLowerCase().includes(search.toLowerCase()))
    .filter((t)=>(filter === "all" ? true : t.type === filter));

  return (
    <div className="bg-white p-4 rounded-xl shadow my-4">
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
            ):(
              filtered.map((t)=>{
                const isEditing=editingId===t.id;
                return (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{t.date}</td>
                    <td className="p-2">
                      {isEditing ? (
                        <input value={editForm.category} className="border p-1 rounded"
                          onChange={(e)=>setEditForm({ ...editForm, category: e.target.value })}/>
                      ):(
                        t.category
                      )}
                    </td>

                    <td className="p-2 capitalize">
                      {isEditing ? (
                        <select value={editForm.type} className="border p-1 rounded"
                          onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>
                      ) : (
                        t.type
                      )}
                    </td>

                    <td className="p-2">
                      {isEditing ? (
                        <input value={editForm.amount} className="border p-1 rounded w-24"
                          onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                        />
                      ) : (
                        `₹${t.amount}`
                      )}
                    </td>

                    {role === "admin" && (
                      <td className="p-2 space-x-2">
                        {isEditing ? (
                          <>
                            <button className="text-green-500 cursor-pointer"
                              onClick={()=>{
                                updateTransaction({
                                  ...t,
                                  amount: Number(editForm.amount),
                                  category: editForm.category,
                                  type: editForm.type as any,
                                });
                                setEditingId(null);
                              }}
                            >
                              Save
                            </button>

                            <button onClick={() => setEditingId(null)} className="text-gray-500 cursor-pointer">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="text-blue-500 cursor-pointer"
                              onClick={() => {
                                setEditingId(t.id);
                                setEditForm({
                                  amount: String(t.amount),
                                  category: t.category,
                                  type: t.type,
                                });
                              }}
                            >
                              Edit
                            </button>

                            <button onClick={() => deleteTransaction(t.id)} className="text-red-500 cursor-pointer">
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};