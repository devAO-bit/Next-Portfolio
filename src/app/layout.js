import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Abhishek Ojha | Full-Stack Engineer",
  description: "Full Stack Developer — MERN, Node.js, React, MongoDB. Building scalable systems and automation tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col grid-bg">
        {/* Subtle radial gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, var(--accent-glow), transparent)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}