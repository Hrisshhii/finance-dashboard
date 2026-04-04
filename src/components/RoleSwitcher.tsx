import { useApp } from "../contexts/AppContext";

export const RoleSwitcher=()=>{
  const {role,setRole}=useApp();

  return (
    <select value={role} onChange={(e)=>setRole(e.target.value as any)} className="border p-2 rounded">
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
};