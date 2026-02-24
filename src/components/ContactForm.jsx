"use client";

export default function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("body"),
      }),
    });

    if (res.ok) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label
            style={{
              display: "block",
              fontFamily: "DM Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 6,
            }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="form-input"
            required
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontFamily: "DM Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 6,
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="form-input"
            required
          />
        </div>
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontFamily: "DM Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 6,
          }}
        >
          Subject
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Let's collaborate on..."
          className="form-input"
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontFamily: "DM Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 6,
          }}
        >
          Message
        </label>
        <textarea
          name="body"
          placeholder="Tell me about your project or opportunity..."
          className="form-input"
          rows={6}
          style={{ resize: "vertical", minHeight: 140 }}
          required
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ alignSelf: "flex-start" }}
      >
        Send Message →
      </button>
    </form>
  );
}
