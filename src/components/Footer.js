export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '28px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Left: Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 10,
              color: '#060910',
            }}
          >
            AO
          </div>
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 12,
              color: 'var(--muted)',
              letterSpacing: '0.04em',
            }}
          >
            © {year} Abhishek Ojha. All rights reserved.
          </span>
        </div>

        {/* Right: Links */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/devAO-bit' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/abhishek-ojha' },
            { label: 'Email', href: 'mailto:abhitech.work@gmail.com' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="font-mono text-xs tracking-wide text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}