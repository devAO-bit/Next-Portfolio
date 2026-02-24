import projects from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | Abhishek Ojha",
};

export default function Projects() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="section-label animate-fade-up">Portfolio</div>
        <h1
          className="font-display animate-fade-up delay-1"
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Things I&apos;ve <span style={{ color: 'var(--accent)' }}>built</span>
        </h1>
        <p
          className="animate-fade-up delay-2"
          style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 480, lineHeight: 1.7 }}
        >
          A selection of production projects, side experiments, and open-source work.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className={`animate-fade-up delay-${(index % 4) + 1}`}
            style={{ display: 'flex' }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="animate-fade-up"
        style={{
          marginTop: 56,
          textAlign: 'center',
          padding: '40px',
          borderRadius: 16,
          border: '1px dashed var(--border)',
          background: 'var(--accent-glow)',
        }}
      >
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--muted)', letterSpacing: '0.04em', marginBottom: 16 }}>
          {/* { More projects on GitHub } */}
        </p>
        <a
          href="https://github.com/devAO-bit"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          View GitHub Profile ↗
        </a>
      </div>

    </div>
  );
}