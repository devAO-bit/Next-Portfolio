"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const updateTheme = () => setTheme(savedTheme);
  updateTheme();
  document.documentElement.classList.toggle("dark", savedTheme === "dark");
}, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="border px-3 py-1 rounded transition"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}