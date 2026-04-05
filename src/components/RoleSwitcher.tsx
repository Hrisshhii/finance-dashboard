import { Download, Moon, Sun } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { useTheme } from "../hooks/useTheme";

export const RoleSwitcher=()=>{
  const {role,setRole,transactions}=useApp();
  const {theme,toggleTheme}=useTheme();

  const exportCSV=()=>{
    const headers=["Date","Category","Type","Amount"];
    const rows=transactions.map((t)=>[t.date,t.category,t.type,t.amount].join(","));
    const csv = [headers.join(","), ...rows].join("\n");

    const blob=new Blob([csv], { type:"text/csv;charset=utf-8;" });
    const url=URL.createObjectURL(blob);

    const link=document.createElement("a");
    link.href=url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleTheme} className="p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100 shadow hover:scale-105 transition cursor-pointer">
        {theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}
      </button>

      <button onClick={exportCSV} className="p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100 shadow hover:scale-105 transition cursor-pointer">
        <Download size={18} />
      </button>

      <select value={role} onChange={(e)=>setRole(e.target.value as any)} className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100 ">
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};