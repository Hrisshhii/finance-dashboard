import { createContext,useContext,useState } from "react";
import type { Transaction,Role } from "../types/types";
import { transactions as mockData } from "../data/mockData";

type AppContextType = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  role: Role;
  setRole: (role: Role)=>void;
};

const AppContext=createContext<AppContextType | null>(null);

export const AppProvider=({ children }:{ children: React.ReactNode })=>{
  const [transactions,setTransactions]=useState<Transaction[]>(mockData);
  const [role,setRole]=useState<Role>("viewer");

  return (
    <AppContext.Provider value={{transactions,setTransactions,role,setRole}}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp=()=>{
  const context=useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};