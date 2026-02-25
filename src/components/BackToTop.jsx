"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        width: "100%",
        padding: "9px 12px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--muted)",
        fontFamily: "DM Mono, monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        cursor: "pointer",
        transition: "all 0.2s",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.background = "var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--muted)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--card)";
      }}
    >
      ↑ Back to top
    </button>
  );
}