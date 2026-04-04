import { createContext,useContext,useState } from "react";
import type { Transaction,Role } from "../types/types";
import { transactions as mockData } from "../data/mockData";

type AppContextType = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  role: Role;
  setRole: (role: Role)=>void;
  deleteTransaction: (id: number)=>void;
  updateTransaction: (t: Transaction)=>void;
};

const AppContext=createContext<AppContextType | null>(null);

export const AppProvider=({ children }:{ children: React.ReactNode })=>{
  const [transactions,setTransactions]=useState<Transaction[]>(mockData);
  const [role,setRole]=useState<Role>("viewer");

  const deleteTransaction=(id: number)=>{
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction=(updated:Transaction)=>{
    setTransactions((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <AppContext.Provider value={{transactions,setTransactions,role,setRole,deleteTransaction,updateTransaction}}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp=()=>{
  const context=useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};