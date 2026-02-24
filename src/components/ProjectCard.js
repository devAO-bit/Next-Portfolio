"use client";
import { useState } from "react";

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 28,
        borderRadius: 16,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        height: "100%",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.08)"
          : "0 4px 10px rgba(0,0,0,0.03)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, var(--accent), #00f5d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#000",
            fontWeight: 700,
          }}
        >
          ⚡
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="link">
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="link">
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          color: "var(--muted)",
          lineHeight: 1.7,
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: 90,
        }}
      >
        {project.description}
      </p>

      {/* Highlights */}
      {project.highlights && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                background: "var(--accent-glow)",
                color: "var(--accent)",
                fontWeight: 500,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Spacer pushes tags to bottom */}
      <div style={{ flexGrow: 1 }} />

      {/* Tags */}
      {project.tags && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: "4px 8px",
                borderRadius: 6,
                background: "var(--surface-2)",
                color: "var(--muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}