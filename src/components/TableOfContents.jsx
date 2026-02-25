"use client";

import { useEffect, useRef, useState } from "react";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  const itemRefs = useRef({});
  // Keep a ref to the latest activeId so the observer closure is always current
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!headings.length) return;

    // Build a map of element → id for fast lookup
    const elements = [];
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) elements.push(el);
    });

    if (!elements.length) return;


    // Strategy: track which headings are above the top of the viewport.
    // The active heading is the LAST one whose top is ≤ 120px from the top.
    const onScroll = () => {
      const scrollY = window.scrollY + 120; // offset for sticky nav
      let current = elements[0].id;
      for (const el of elements) {
        if (el.offsetTop <= scrollY) {
          current = el.id;
        }
      }
      if (current !== activeIdRef.current) {
        setActiveId(current);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  useEffect(() => {
  const activeEl = itemRefs.current[activeId];
  if (activeEl) {
    activeEl.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }
}, [activeId]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents">
      {/* Label */}
      <div
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 14,
            height: 1,
            background: "var(--accent)",
          }}
        />
        On this page
      </div>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;
          const isH3 = level === 3;

          return (
            <li key={id}>
              <a
                ref={(el) => {
                  if (el) itemRefs.current[id] = el;
                }}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(id);
                  if (el) {
                    const top =
                      el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                  setActiveId(id);
                }}
                style={{
                  display: "block",
                  padding: isH3 ? "4px 8px 4px 18px" : "5px 8px",
                  borderLeft: `2px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                  fontSize: isH3 ? 11 : 12,
                  lineHeight: 1.45,
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "DM Sans, sans-serif",
                  textDecoration: "none",
                  background: isActive ? "var(--accent-glow)" : "transparent",
                  borderRadius: "0 4px 4px 0",
                  transition:
                    "color 0.15s, border-color 0.15s, background 0.15s",
                }}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
