'use client'
import Image from "next/image";
import Link from "next/link";

const techStack = [
  "Node.js", "React", "Next.js", "MongoDB", "TypeScript",
  "Express.js", "PostgreSQL", "Docker", "AWS", "Python",
];

const stats = [
  { value: "2+",    label: "Years Experience" },
  { value: "30+",   label: "APIs Built" },
  { value: "150K+", label: "Records Processed" },
  { value: "65%",   label: "Cost Reduction" },
];

export default function Home() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 48 }}>

          {/* Left: text */}
          <div style={{ flex: '1 1 480px', maxWidth: 580 }}>
            {/* Status badge */}
            <div className="animate-fade-up" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span className="status-dot" />
              <span
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 12,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                Available for opportunities
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up delay-1 font-display"
              style={{
                fontSize: 'clamp(38px, 6vw, 68px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 24,
                color: 'var(--foreground)',
              }}
            >
              Building the web,
              <br />
              <span style={{ color: 'var(--accent)' }}>one API</span> at a time.
            </h1>

            {/* Subtext */}
            <p
              className="animate-fade-up delay-2"
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'var(--muted)',
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Full-stack engineer specialising in{' '}
              <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>Node.js, React & MongoDB</span>.
              I architect scalable backend systems, automate workflows, and ship production-grade applications.
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href="/projects" className="btn-primary">
                View Projects →
              </Link>
              <Link href="/contact" className="btn-outline">
                Get in Touch
              </Link>
            </div>

            {/* Social links */}
            <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <a
                href="https://github.com/devAO-bit"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                GitHub ↗
              </a>
              <span style={{ color: 'var(--border)' }}>|</span>
              <a
                href="https://linkedin.com/in/abhishek-ojha"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                LinkedIn ↗
              </a>
              <span style={{ color: 'var(--border)' }}>|</span>
              <a
                href="mailto:abhitech.work@gmail.com"
                style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                Email ↗
              </a>
            </div>
          </div>

          {/* Right: Profile image card */}
          <div className="animate-fade-in delay-2" style={{ flex: '0 0 auto' }}>
            <div
              style={{
                position: 'relative',
                width: 280,
                height: 280,
              }}
            >
              {/* Decorative border */}
              <div
                style={{
                  position: 'absolute',
                  inset: -3,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))',
                  padding: 3,
                }}
              >
                <div style={{ borderRadius: '50%', width: '100%', height: '100%', background: 'var(--background)' }} />
              </div>
              <Image
                src="/Profile.png"
                width={280}
                height={280}
                alt="Abhishek Ojha"
                style={{
                  position: 'absolute',
                  inset: 4,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: "center 20%",
                  width: 'calc(100% - 8px)',
                  height: 'calc(100% - 8px)',
                }}
              />
              {/* Floating badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: -16,
                  background: 'var(--card)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 10,
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="status-dot" style={{ width: 6, height: 6 }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--foreground)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section className="animate-fade-up delay-5" style={{ marginBottom: 80 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 1,
            background: 'var(--border)',
            borderRadius: 14,
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: '28px 24px',
                background: 'var(--card)',
                textAlign: 'center',
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: 'var(--accent)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 400 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section style={{ marginBottom: 96 }}>
        <div className="section-label animate-fade-up">Tech Stack</div>
        <h2
          className="font-display animate-fade-up delay-1"
          style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, letterSpacing: '-0.01em' }}
        >
          Tools I work with
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {techStack.map((tech, i) => (
            <span key={tech} className={`tag animate-fade-up delay-${(i % 4) + 1}`}>
              {tech}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}