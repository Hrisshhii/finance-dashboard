import { Moon, Sun } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { useTheme } from "../hooks/useTheme";

export const RoleSwitcher=()=>{
  const {role,setRole}=useApp();
  const {theme,toggleTheme}=useTheme();

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleTheme} className="p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100 shadow hover:scale-105 transition cursor-pointer">
        {theme==="dark"?<Sun />:<Moon />}
      </button>
      <select value={role} onChange={(e)=>setRole(e.target.value as any)} className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100 ">
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};