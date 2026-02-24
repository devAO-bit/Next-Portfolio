"use client";

import { useState } from "react";

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: 'var(--accent-glow)',
            border: '1px solid rgba(0,194,168,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          ⚡
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontFamily: 'DM Mono, monospace',
                fontSize: 12,
                color: 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontFamily: 'DM Mono, monospace',
                fontSize: 12,
                color: 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h2
        className="font-display"
        style={{
          fontSize: 19,
          fontWeight: 700,
          color: 'var(--foreground)',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
        }}
      >
        {project.title}
      </h2>

      {/* Description */}
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, flex: 1 }}>
        {project.description}
      </p>

      {/* Highlights */}
      {project.highlights && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.highlights.map((h) => (
            <span
              key={h}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                background: 'var(--surface-2)',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                letterSpacing: '0.02em',
              }}
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {project.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 4, borderTop: '1px solid var(--border)' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}