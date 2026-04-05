import { useEffect,useState } from "react";

export const useTheme=()=>{
  const [theme, setTheme]=useState<"light"|"dark">(()=>{
    return (localStorage.getItem("theme") as "light"|"dark") || "light";
  });

  useEffect(()=>{
    const root=document.documentElement;

    if (theme==="dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme=()=>{
    setTheme(prev=>(prev === "dark" ? "light" : "dark"));
  };

  return { theme,toggleTheme };
};