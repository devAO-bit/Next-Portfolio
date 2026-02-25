"use client";

import { useState } from "react";
import Link from "next/link";
import TableOfContents from "./TableOfContents";
import BackToTop from "./BackToTop";

export default function BlogSidebar({ post, headings, related }) {
  const metaItems = [
    {
      icon: "📅",
      label: new Date(post.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    { icon: "⏱️", label: `${post.readTime} min read` },
    { icon: "✍️", label: "Abhishek Ojha" },
  ];

  const connectLinks = [
    { icon: "🐙", label: "GitHub", href: "https://github.com/devAO-bit" },
    {
      icon: "💼",
      label: "LinkedIn",
      href: "https://linkedin.com/in/abhishek-ojha",
    },
    { icon: "✉️", label: "Email me", href: "mailto:abhitech.work@gmail.com" },
  ];

  return (
    <aside
      style={{
        position: "sticky",
        top: 84,
        // KEY FIX: constrain height to viewport so sidebar doesn't overflow
        display: "flex",
        flexDirection: "column",
        gap: 14,
        height: "calc(100vh - 100px)",
        overflowX: "hidden",
        // Hide scrollbar visually but keep it functional
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      {/* Hide webkit scrollbar */}
      <style>{`aside::-webkit-scrollbar { display: none; }`}</style>

      {/* ── Post meta card ── */}
      <div
        className="card"
        style={{
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>
            {post.coverEmoji}
          </span>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "Syne, sans-serif",
              color: "var(--foreground)",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {post.title}
          </p>
        </div>

        <div style={{ height: 1, background: "var(--border)" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {metaItems.map(({ icon, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 7 }}
            >
              <span style={{ fontSize: 10, flexShrink: 0 }}>{icon}</span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "var(--border)" }} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
              style={{ fontSize: 10, padding: "2px 7px" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Table of Contents ── */}
      {headings.length > 0 && (
        <div
          className="card"
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column", // adjust as you like
          }}
        >
          <div style={{ overflowY: "auto", paddingRight: 4 }}>
            <TableOfContents headings={headings} />
          </div>
        </div>
      )}

      {/* ── Connect ── */}
      <div className="card" style={{ padding: "14px 12px", flexShrink: 0 }}>
        <SidebarLabel>Connect</SidebarLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {connectLinks.map(({ icon, label, href }) => (
            <SidebarLink key={label} href={href} icon={icon} label={label} />
          ))}
        </div>
      </div>

      {/* ── More posts ── */}
      {related.length > 0 && (
        <div className="card" style={{ padding: "14px 12px", flexShrink: 0 }}>
          <SidebarLabel>More posts</SidebarLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {related.map((r) => (
              <RelatedPostRow key={r.slug} post={r} />
            ))}
          </div>
        </div>
      )}

      {/* ── Back to top ── */}
      <div style={{ flexShrink: 0 }}>
        <BackToTop />
      </div>
    </aside>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SidebarLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "DM Mono, monospace",
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 7,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 12,
          height: 1,
          background: "var(--accent)",
        }}
      />
      {children}
    </div>
  );
}

function SidebarLink({ href, icon, label }) {
  const isExternal = href.startsWith("http");
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 8px",
        borderRadius: 6,
        fontFamily: "DM Mono, monospace",
        fontSize: 11,
        textDecoration: "none",
        transition: "all 0.2s",
        border: `1px solid ${hovered ? "var(--accent)" : "transparent"}`,
        color: hovered ? "var(--accent)" : "var(--muted)",
        background: hovered ? "var(--accent-glow)" : "transparent",
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span>
      {label} ↗
    </a>
  );
}

function RelatedPostRow({ post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
          padding: "7px 8px",
          borderRadius: 7,
          transition: "background 0.2s",
          background: hovered ? "var(--accent-glow)" : "transparent",
          cursor: "pointer",
        }}
      >
        <span
          style={{ fontSize: 15, flexShrink: 0, lineHeight: 1, marginTop: 2 }}
        >
          {post.coverEmoji}
        </span>
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.4,
              fontFamily: "Syne, sans-serif",
            }}
          >
            {post.title}
          </p>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: 9,
              color: "var(--accent)",
              letterSpacing: "0.04em",
            }}
          >
            {post.readTime} min →
          </span>
        </div>
      </div>
    </Link>
  );
}
