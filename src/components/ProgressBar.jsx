"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: `${progress}%`,
        background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
        borderRadius: "0 2px 2px 0",
        transition: "width 0.1s linear",
        boxShadow: "0 0 8px var(--accent-glow)",
      }}
    />
  );
}