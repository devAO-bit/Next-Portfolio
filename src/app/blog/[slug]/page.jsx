import blogs from "@/data/blogs.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import BlogSidebar from "@/components/BlogSidebar";

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Abhishek Ojha`,
    description: post.excerpt,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(content) {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => {
      const level = l.startsWith("### ") ? 3 : 2;
      const text = l.replace(/^#{2,3}\s/, "");
      return { id: slugify(text), text, level };
    });
}

// ─── Markdown renderer (pure — no event handlers) ────────────────────────────

function renderContent(content) {
  const lines = content.split("\n");
  const elements = [];
  let codeBuffer = [];
  let inCode = false;
  let codeLang = "";
  let key = 0;
  let firstH2 = true; // used to suppress border-top on the very first ## heading

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
        codeBuffer = [];
      } else {
        elements.push(
          <div key={key++} style={{ margin: "28px 0", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
            {codeLang && (
              <div style={{ padding: "8px 16px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)", fontFamily: "DM Mono, monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {codeLang}
              </div>
            )}
            <pre style={{ margin: 0, padding: "20px", background: "var(--surface)", overflowX: "auto", fontSize: 13, lineHeight: 1.75, fontFamily: "DM Mono, monospace", color: "var(--foreground)" }}>
              <code>{codeBuffer.join("\n")}</code>
            </pre>
          </div>
        );
        inCode = false;
        codeBuffer = [];
        codeLang = "";
      }
      continue;
    }

    if (inCode) { codeBuffer.push(line); continue; }

    if (line.startsWith("## ")) {
      const text = line.slice(3);
      const isFirst = firstH2;
      firstH2 = false;
      elements.push(
        <h2 key={key++} id={slugify(text)} className="font-display"
          style={{
            fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em",
            color: "var(--foreground)",
            marginTop: isFirst ? 8 : 48,
            marginBottom: 14,
            paddingTop: isFirst ? 0 : 16,
            borderTop: isFirst ? "none" : "1px solid var(--border)",
            scrollMarginTop: 88,
          }}>
          {text}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4);
      elements.push(
        <h3 key={key++} id={slugify(text)} className="font-display"
          style={{ fontSize: 17, fontWeight: 700, color: "var(--foreground)", marginTop: 28, marginBottom: 8, scrollMarginTop: 88 }}>
          {text}
        </h3>
      );
      continue;
    }

    // Table
    if (line.startsWith("| ")) {
      const tableLines = [line];
      while (i + 1 < lines.length && lines[i + 1].startsWith("| ")) { i++; tableLines.push(lines[i]); }
      const rows = tableLines.filter((r) => !r.match(/^\|[\s-|]+\|$/));
      elements.push(
        <div key={key++} style={{ overflowX: "auto", margin: "20px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: "DM Mono, monospace" }}>
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split("|").filter((_, ci) => ci > 0 && ci < row.split("|").length - 1);
                const Tag = ri === 0 ? "th" : "td";
                return (
                  <tr key={ri} style={{ borderBottom: "1px solid var(--border)" }}>
                    {cells.map((cell, ci) => (
                      <Tag key={ci} style={{ padding: "10px 14px", textAlign: "left", color: ri === 0 ? "var(--accent)" : "var(--muted)", fontWeight: ri === 0 ? 600 : 400, background: ri === 0 ? "var(--surface-2)" : "transparent", whiteSpace: "nowrap" }}>
                        {cell.trim()}
                      </Tag>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} style={{ display: "flex", gap: 10, fontSize: 15, color: "var(--muted)", lineHeight: 1.7, marginBottom: 6 }}>
          <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }}>▸</span>
          <span>{parseInline(line.slice(2))}</span>
        </li>
      );
      continue;
    }

    if (line.trim() === "") { elements.push(<div key={key++} style={{ height: 10 }} />); continue; }

    elements.push(
      <p key={key++} style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.8, marginBottom: 4 }}>
        {parseInline(line)}
      </p>
    );
  }

  return elements;
}

function parseInline(text) {
  const parts = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0; let m; let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const raw = m[0];
    if (raw.startsWith("`")) {
      parts.push(
        <code key={i++} style={{ fontFamily: "DM Mono, monospace", fontSize: "0.875em", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 6px", color: "var(--accent)" }}>
          {raw.slice(1, -1)}
        </code>
      );
    } else if (raw.startsWith("**")) {
      parts.push(
        <strong key={i++} style={{ color: "var(--foreground)", fontWeight: 600 }}>
          {raw.slice(2, -2)}
        </strong>
      );
    }
    last = m.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const related = blogs
    .filter((b) => b.slug !== post.slug && b.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const headings = extractHeadings(post.content);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 96px" }}>

      {/* Reading progress bar — ProgressBar itself is a client component */}
      <div style={{ position: "fixed", top: 64, left: 0, right: 0, height: 3, zIndex: 50, background: "var(--border)" }}>
        <ProgressBar />
      </div>

      {/* Back link — no handlers needed, plain anchor styling via CSS */}
      <Link href="/blog" className="back-link">
        ← Back to Blog
      </Link>

      {/* ── 2-col layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "48px", alignItems: "start" }}>

        {/* Sidebar — fully client */}
        <BlogSidebar post={post} headings={headings} related={related} />

        {/* Article — pure server, no event handlers */}
        <article style={{ minWidth: 0 }}>

          <header style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 40 }}>{post.coverEmoji}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </div>

            <h1 className="font-display"
              style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--foreground)", marginBottom: 20 }}>
              {post.title}
            </h1>

            <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.65, marginBottom: 24, fontStyle: "italic" }}>
              {post.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 10, color: "#060910", flexShrink: 0 }}>
                  AO
                </div>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "var(--foreground)", letterSpacing: "0.04em" }}>
                  Abhishek Ojha
                </span>
              </div>
              <span style={{ color: "var(--border)" }}>·</span>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "var(--muted)", letterSpacing: "0.04em" }}>
                {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "var(--muted)", letterSpacing: "0.04em" }}>
                {post.readTime} min read
              </span>
            </div>
          </header>

          <div style={{ marginBottom: 56 }}>
            {renderContent(post.content)}
          </div>

          {/* Tags footer */}
          <div style={{ padding: "24px 0", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 4 }}>
              Tagged:
            </span>
            {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>

          {/* Author card */}
          <div className="card" style={{ padding: "28px", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#060910", flexShrink: 0 }}>
              AO
            </div>
            <div style={{ flex: 1 }}>
              <div className="font-display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                Abhishek Ojha
              </div>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 12 }}>
                Full-stack engineer with 2+ years building scalable Node.js backends, React frontends, and automation pipelines. Currently based in Mumbai, India.
              </p>
              <div style={{ display: "flex", gap: 14 }}>
                {[
                  { label: "GitHub",   href: "https://github.com/devAO-bit" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/abhishek-ojha" },
                  { label: "Email",    href: "mailto:abhitech.work@gmail.com" },
                ].map((link) => (
                  <a key={link.label} href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="author-link"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}