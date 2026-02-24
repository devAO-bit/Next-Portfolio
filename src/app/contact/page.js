import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "Contact | Abhishek Ojha",
};

const contactInfo = [
    {
        icon: "✉️",
        label: "Email",
        value: "abhitech.work@gmail.com",
        href: "mailto:abhitech.work@gmail.com",
    },
    {
        icon: "💼",
        label: "LinkedIn",
        value: "linkedin.com/in/abhishek-ojha",
        href: "https://linkedin.com/in/abhishek-ojha",
    },
    {
        icon: "🐙",
        label: "GitHub",
        value: "github.com/devAO-bit",
        href: "https://github.com/devAO-bit",
    },
    {
        icon: "📍",
        label: "Location",
        value: "Bhayandar, Maharashtra, India",
        href: null,
    },
];

export default function Contact() {
    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>

            {/* Header */}
            <div style={{ marginBottom: 56 }}>
                <div className="section-label animate-fade-up">Contact</div>
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
                    Let&apos;s build something
                    <br />
                    <span style={{ color: 'var(--accent)' }}>together</span>
                </h1>
                <p
                    className="animate-fade-up delay-2"
                    style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 480, lineHeight: 1.7 }}
                >
                    Open to full-time roles, freelance projects, and interesting collaborations.
                    Drop me a message and I&apos;ll get back within 24 hours.
                </p>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

                {/* Left: Contact info */}
                <div className="animate-fade-up delay-2">
                    <h2
                        className="font-display"
                        style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, letterSpacing: '-0.01em' }}
                    >
                        Reach out directly
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                        {contactInfo.map((item) => (
                            <div
                                key={item.label}
                                className="card"
                                style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}
                            >
                                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: 'DM Mono, monospace',
                                            fontSize: 10,
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            color: 'var(--muted)',
                                            marginBottom: 2,
                                        }}
                                    >
                                        {item.label}
                                    </div>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel="noreferrer"
                                            className="text-foreground hover:text-(--accent) transition-colors duration-200 font-medium text-sm"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span style={{ fontSize: 14, color: 'var(--foreground)', fontWeight: 500 }}>
                                            {item.value}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Availability badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '14px 20px',
                            borderRadius: 10,
                            background: 'var(--accent-glow)',
                            border: '1px solid rgba(0,194,168,0.2)',
                        }}
                    >
                        <span className="status-dot" />
                        <div>
                            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                Currently Available
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
                                Open to full-time & freelance opportunities
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="animate-fade-up delay-3">
                    <h2
                        className="font-display"
                        style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, letterSpacing: '-0.01em' }}
                    >
                        Send a message
                    </h2>
                    <ContactForm />
                </div>
            </div>

        </div>
    );
}