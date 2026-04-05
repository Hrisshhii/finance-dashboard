import { useState } from "react";
import { useApp } from "../../contexts/AppContext";

export const TransactionsTable=()=>{
  const { transactions,role,deleteTransaction,updateTransaction }=useApp();

  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState<"all"|"income"|"expense">("all");
  const [editingId,setEditingId]=useState<number|null>(null);
  const [order,setOrder]=useState<"asc"|"desc">("desc");
  const [sortBy,setSortBy]=useState<"date"|"amount">("date");
  const [editForm,setEditForm]=useState({
    amount:"",
    category:"",
    type:"expense"
  })

  const filtered=transactions.filter((t)=>t.category.toLowerCase().includes(search.toLowerCase()))
    .filter((t)=>(filter === "all" ? true : t.type === filter));

  const sorted=[...filtered].sort((a,b)=>{
    if(sortBy==="amount"){
      return order==="asc"?a.amount-b.amount:b.amount-a.amount;
    }else{
      return order==="asc"?new Date(a.date).getTime()-new Date(b.date).getTime()
        : new Date(b.date).getTime()-new Date(a.date).getTime();
    }
  });

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-4 rounded-xl shadow my-4">
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-3 my-4">
        
        <input type="text" value={search} placeholder="Search category..."
          onChange={e=>setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select value={filter} className="border p-2 rounded w-full md:w-1/3"
          onChange={e=>setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={sortBy} className="border p-2 rounded md:w-1/3"
          onChange={e=>setSortBy(e.target.value as any)}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <select value={order} className="border p-2 rounded md:w-1/3"
          onChange={e=>setOrder(e.target.value as any)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

      </div>

      <div className="hidden md:block overflow-x-auto">
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
              sorted.map((t)=>{
                const isEditing=editingId===t.id;
                return (
                  <tr key={t.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-600 transition">
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

      <div className="md:hidden space-y-3">
        {sorted.length === 0 ? (
          <div className="text-center text-gray-500">No transactions</div>
        ):(
          sorted.map((t)=>{
            const isEditing=editingId===t.id;

            return(
              <div key={t.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t.date}</span>
                  <span className={`text-sm font-medium ${t.type==="income"?"text-green-600":"text-red-500"}`}>
                    ₹{t.amount}
                  </span>
                </div>

                <div>
                  {isEditing ? (
                    <input value={editForm.category} className="border p-1 rounded w-full"
                      onChange={(e)=>setEditForm({ ...editForm, category: e.target.value })}
                    />
                  ):(
                    <span className="font-medium">{t.category}</span>
                  )}
                </div>

                <div className="text-sm capitalize">
                  {isEditing ? (
                    <select value={editForm.type} className="border p-1 rounded w-full"
                      onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  ):(
                    <span className={t.type==="income"?"text-green-500":"text-red-500"}>
                      {t.type}
                    </span>
                  )}
                </div>

                {role === "admin" && (
                  <div className="flex gap-3 pt-2">
                    {isEditing?(
                      <>
                        <button className="text-green-500"
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

                        <button onClick={()=>setEditingId(null)} className="text-gray-500">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="text-blue-500"
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

                        <button onClick={()=>deleteTransaction(t.id)} className="text-red-500">
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};