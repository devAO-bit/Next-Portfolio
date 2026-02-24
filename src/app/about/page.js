export const metadata = {
  title: "About | Abhishek Ojha",
};

const experience = [
  {
    role: "Software Development Engineer - 1",
    company: "Codezen Tech Solutions",
    period: "Oct 2024 – Jan 2026",
    location: "Andheri, India",
    highlights: [
      "Architected and maintained 30+ RESTful APIs handling 25+ document types with MongoDB",
      "Built automated report generation system reducing manual reporting time by 30% across 12 monthly reports",
      "Developed data pipeline processing 150,000 rows/execution with Pandas/NumPy, saving 25 hours monthly",
      "Reduced production errors 30% by resolving 7 cross-model error patterns with comprehensive validation",
    ],
  },
  {
    role: "Backend Developer (Node.js)",
    company: "Terado Engineering Pvt Ltd",
    period: "May 2024 – Jul 2024",
    location: "Virar, India",
    highlights: [
      "Designed admission management system processing 500+ student applications with multi-step dynamic forms",
      "Built customizable workflow module reducing administrative setup time by 50%",
      "Implemented centralized error handling (CustomError, ValidationError) + Winston-based structured logging",
      "Designed scalable routing system with dynamic auto-loading of versioned modules",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "VirarHub Incubators",
    period: "Sep 2023 – Mar 2024",
    location: "Virar, India",
    highlights: [
      "Developed high-performance web applications using Next.js with SSR, optimizing SEO and UX",
      "Built reusable component library with Tailwind CSS, Shadcn-UI, and Next-UI — cut dev time by 50%",
      "Integrated headless CMS reducing content update turnaround time by 80%",
    ],
  },
];

const skills = [
  { category: "Languages",       items: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"] },
  { category: "Frontend",        items: ["React", "Next.js", "Tailwind CSS", "Shadcn-UI", "SSR"] },
  { category: "Backend",         items: ["Node.js", "Express.js", "Django", "RESTful APIs", "Microservices"] },
  { category: "Databases",       items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"] },
  { category: "Cloud & DevOps",  items: ["AWS (EC2, S3)", "Docker", "PM2", "Ubuntu/Linux", "Cloudinary CDN"] },
  { category: "Specialisations", items: ["Multi-tenant Architecture", "RBAC", "Data Pipelines", "Performance Optimisation"] },
];

export default function About() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 64 }}>
        <div className="section-label animate-fade-up">About Me</div>
        <h1
          className="font-display animate-fade-up delay-1"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20 }}
        >
          Engineer by trade,
          <br />
          <span style={{ color: 'var(--accent)' }}>problem-solver</span> at heart.
        </h1>
        <p
          className="animate-fade-up delay-2"
          style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 560, lineHeight: 1.75 }}
        >
          I&apos;m a Full-Stack Software Engineer with 2+ years building scalable backend systems and
          modern web applications. I&apos;m passionate about clean architecture, automation, and writing
          code that lasts. Currently based in Bhayandar, Maharashtra, India.
        </p>
      </div>

      {/* ── Experience Timeline ── */}
      <section style={{ marginBottom: 72 }}>
        <div className="section-label animate-fade-up">Experience</div>
        <h2 className="font-display animate-fade-up delay-1" style={{ fontSize: 28, fontWeight: 700, marginBottom: 36, letterSpacing: '-0.01em' }}>
          Work History
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {experience.map((job, idx) => (
            <div
              key={idx}
              className={`animate-fade-up delay-${idx + 1}`}
              style={{ position: 'relative', paddingLeft: 48, paddingBottom: 40 }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: idx === 0 ? 'var(--accent)' : 'var(--border)',
                  border: '2px solid var(--accent)',
                  zIndex: 2,
                }}
              />
              {/* Vertical line */}
              {idx < experience.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 5,
                    top: 18,
                    bottom: 0,
                    width: 1,
                    background: 'var(--border)',
                  }}
                />
              )}

              {/* Content */}
              <div className="card" style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--foreground)', marginBottom: 2 }}>
                      {job.role}
                    </h3>
                    <div style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>{job.company}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.04em' }}>{job.period}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{job.location}</div>
                  </div>
                </div>

                <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {job.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills Grid ── */}
      <section style={{ marginBottom: 72 }}>
        <div className="section-label animate-fade-up">Skills</div>
        <h2 className="font-display animate-fade-up delay-1" style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, letterSpacing: '-0.01em' }}>
          Technical Arsenal
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {skills.map((group, idx) => (
            <div key={idx} className={`card animate-fade-up delay-${(idx % 3) + 1}`} style={{ padding: '20px 24px' }}>
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: 12,
                }}
              >
                {group.category}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education & Certification ── */}
      <section>
        <div className="section-label animate-fade-up">Background</div>
        <h2 className="font-display animate-fade-up delay-1" style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, letterSpacing: '-0.01em' }}>
          Education & Certifications
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {[
            {
              icon: "🎓",
              title: "Bachelor of Engineering in Computer Science",
              org: "VIVA Institute of Technology (University of Mumbai)",
              period: "Graduated 2023",
              location: "Virar (East), India",
            },
            {
              icon: "📜",
              title: "MERN Stack Development Certification",
              org: "Edba Academy",
              period: "Feb 2023 – Jun 2023",
              location: "",
            },
          ].map((item, idx) => (
            <div key={idx} className={`card animate-fade-up delay-${idx + 2}`} style={{ padding: '24px 28px', display: 'flex', gap: 18 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: 14, color: 'var(--accent)', marginBottom: 4 }}>{item.org}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.04em' }}>
                  {item.period}{item.location ? ` · ${item.location}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}