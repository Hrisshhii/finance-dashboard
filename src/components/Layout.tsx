import { useState } from "react";
import clsx from "clsx";
import { ChartNoAxesCombined, DollarSign, LayoutDashboard, TableOfContents } from "lucide-react";

export const Layout=({ children }: { children: React.ReactNode }) => {
  const [collapsed,setCollapsed]=useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={clsx("bg-white shadow-md p-4 transition-all duration-300", collapsed?"w-20":"w-64")}>
        <div className={`flex items-center mb-6 ${collapsed?"justify-center":"justify-between"}`}>
          {!collapsed && <h1 className="text-xl font-bold">Finance</h1>}
          <button onClick={()=>setCollapsed(!collapsed)} className="text-gray-600 hover:scale-110 transition duration-300 cursor-pointer hover:text-black">
            <TableOfContents/>
          </button>
        </div>

        <nav className="space-y-4">
          <NavItem label="Dashboard" icon={<LayoutDashboard/>} collapsed={collapsed} />
          <NavItem label="Transactions" icon={<DollarSign/>} collapsed={collapsed} />
          <NavItem label="Insights" icon={<ChartNoAxesCombined/>} collapsed={collapsed} />
        </nav>
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

type NavProp={
  label:string;
  collapsed:boolean;
  icon:React.ReactNode;
};

const NavItem = ({ label,collapsed,icon }:NavProp)=>{
  return (
    <div className={`flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded ${collapsed?"justify-center":""}`}>
      <span>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </div>
  );
};