"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  if (!mounted) return <div style={{ width: 40, height: 36 }} />;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 40,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        cursor: 'pointer',
        fontSize: 16,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        color: 'var(--foreground)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '0 0 10px var(--accent-glow)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}