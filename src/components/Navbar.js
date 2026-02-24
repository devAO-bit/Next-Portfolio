"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home",     path: "/" },
  { name: "About",    path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo / Wordmark */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 14,
                color: '#060910',
                letterSpacing: '0.02em',
              }}
            >
              AO
            </div>
            <span
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 17,
                color: 'var(--foreground)',
                letterSpacing: '0.02em',
              }}
            >
              Abhishek
              <span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                style={{
                  position: 'relative',
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 14,
                  letterSpacing: '0.02em',
                  color: isActive ? 'var(--accent)' : 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--foreground)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--muted)'; }}
              >
                {link.name}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20,
                      height: 2,
                      borderRadius: 1,
                      background: 'var(--accent)',
                    }}
                  />
                )}
              </Link>
            );
          })}

          <div style={{ marginLeft: 12 }}>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}