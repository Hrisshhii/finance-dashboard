import { useState } from "react";
import clsx from "clsx";
import { ChartNoAxesCombined,DollarSign,LayoutDashboard,TableOfContents } from "lucide-react";

type LayoutProps={
  children: React.ReactNode;
  active: string;
  setActive: (val:string)=>void;
};

export const Layout=({ children, active, setActive }: LayoutProps)=>{
  const [collapsed,setCollapsed]=useState(true);
  const [mobileOpen,setMobileOpen]=useState(false);

  return (
    <div className="flex items-start min-h-screen bg-gray-50">
      <div className={clsx("bg-white shadow-md p-4 fixed md:sticky md:top-0 left-0 h-screen z-50 transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className={`flex items-center mb-6 ${collapsed?"justify-center":"justify-between"}`}>
          {!collapsed && <h1 className="text-xl font-bold">Finance</h1>}
          <button onClick={()=>setCollapsed(!collapsed)}
            className="text-gray-600 hover:scale-110 transition cursor-pointer hover:text-black"
          >
            <TableOfContents />
          </button>
        </div>

        <nav className="space-y-2">
          <NavItem label="Dashboard" icon={<LayoutDashboard />} collapsed={collapsed} active={active} setActive={setActive} />
          <NavItem label="Transactions" icon={<DollarSign />} collapsed={collapsed} active={active} setActive={setActive} />
          <NavItem label="Insights" icon={<ChartNoAxesCombined />} collapsed={collapsed} active={active} setActive={setActive} />
        </nav>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex-1 p-4 md:p-6 w-full max-w-7xl mx-auto">
        <div className="md:hidden mb-4 flex items-center gap-3">
          <button onClick={()=>setMobileOpen(true)} className="p-2 bg-white rounded shadow">
            <TableOfContents/>
          </button>
          <h1 className="text-xl font-bold">{active}</h1>
        </div>

        {children}
      </div>
    </div>
  );
};

type NavProp = {
  label: string;
  collapsed: boolean;
  icon: React.ReactNode;
  active: string;
  setActive: (val: string) => void;
};

const NavItem=({ label,collapsed,icon,active,setActive }:NavProp)=>{
  const isActive = active===label;

  return (
    <div
      className={clsx( "flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200",
        collapsed && "justify-center",
        isActive ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
      )}
      onClick={()=>setActive(label)}
    >
      <span>{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
    </div>
  );
};