"use client";

import Link from "next/link";

export default function BlogCard({ post, featured = false }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          className="card"
          style={{
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Accent corner glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "var(--accent-glow)",
              pointerEvents: "none",
            }}
          />

          {/* Featured label + emoji */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "var(--accent-glow)",
                border: "1px solid rgba(0,194,168,0.2)",
                padding: "3px 10px",
                borderRadius: 100,
              }}
            >
              ★ Featured
            </span>
            <span style={{ fontSize: 28 }}>{post.coverEmoji}</span>
          </div>

          {/* Title */}
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
              maxWidth: 620,
            }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, maxWidth: 560 }}>
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: 12,
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: 12,
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              {post.readTime} min read
            </span>
            <span style={{ color: "var(--border)" }}>·</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Read arrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Read Article →
          </div>
        </div>
      </Link>
    );
  }

  // Regular card
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex", height: "100%" }}>
      <div className="card" style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 14, width: "100%", cursor: "pointer" }}>
        {/* Emoji + meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: 26 }}>{post.coverEmoji}</span>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {post.readTime} min
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-display"
          style={{
            fontSize: 17,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: "var(--foreground)",
            flex: 1,
          }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          style={{
            fontSize: 13,
            color: "var(--muted)",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer */}
        <div
          style={{
            paddingTop: 14,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
      </div>
    </Link>
  );
}