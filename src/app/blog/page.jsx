import blogs from "@/data/blogs.json";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog | Abhishek Ojha",
  description: "Technical articles on Node.js, React, MongoDB, system design, and engineering lessons from production.",
};

const TOPICS = ["All", "Node.js", "React", "MongoDB", "Python", "Architecture", "DevOps", "Next.js"];

export default function Blog() {
  const featured = blogs.find((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 96px" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 48 }}>
        <div className="section-label animate-fade-up">Writing</div>
        <h1
          className="font-display animate-fade-up delay-1"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Thoughts on{" "}
          <span style={{ color: "var(--accent)" }}>engineering</span>
        </h1>
        <p
          className="animate-fade-up delay-2"
          style={{ fontSize: 17, color: "var(--muted)", maxWidth: 500, lineHeight: 1.7 }}
        >
          Deep dives into backend architecture, performance optimisation, and real lessons
          from building production systems.
        </p>
      </div>

      {/* ── Topic filter pills (visual only — swap for client component + state if you want live filtering) ── */}
      <div
        className="animate-fade-up delay-2"
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 44 }}
      >
        {TOPICS.map((topic, i) => (
          <span
            key={topic}
            style={{
              padding: "6px 16px",
              borderRadius: 100,
              fontFamily: "DM Mono, monospace",
              fontSize: 12,
              letterSpacing: "0.06em",
              cursor: "pointer",
              border: "1px solid var(--border)",
              color: i === 0 ? "var(--accent)" : "var(--muted)",
              background: i === 0 ? "var(--accent-glow)" : "transparent",
              borderColor: i === 0 ? "rgba(0,194,168,0.3)" : "var(--border)",
              transition: "all 0.2s",
            }}
          >
            {topic}
          </span>
        ))}
      </div>

      {/* ── Featured Post ── */}
      {featured && (
        <div className="animate-fade-up delay-2" style={{ marginBottom: 36 }}>
          <BlogCard post={featured} featured />
        </div>
      )}

      {/* ── Divider with count ── */}
      <div
        className="animate-fade-up delay-3"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
            whiteSpace: "nowrap",
          }}
        >
          All posts · {blogs.length}
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {/* ── Posts grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 18,
        }}
      >
        {rest.map((post, idx) => (
          <div
            key={post.slug}
            className={`animate-fade-up delay-${(idx % 4) + 1}`}
            style={{ display: "flex" }}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      {/* ── Newsletter / subscribe strip ── */}
      <div
        className="animate-fade-up"
        style={{
          marginTop: 64,
          padding: "40px 40px",
          borderRadius: 16,
          border: "1px solid var(--card-border)",
          background: "var(--card)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "var(--accent-glow)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 420 }}>
          <h3
            className="font-display"
            style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}
          >
            Want more articles like these?
          </h3>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>
            I write about backend engineering, performance, and real-world system design. Connect with me to get notified when I publish.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="https://linkedin.com/in/abhishek-ojha"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Follow on LinkedIn ↗
          </a>
          <a
            href="https://github.com/devAO-bit"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            GitHub
          </a>
        </div>
      </div>

    </div>
  );
}