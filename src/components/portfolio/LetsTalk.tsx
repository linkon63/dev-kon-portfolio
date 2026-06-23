"use client";

import { useState } from "react";
import { FaXTwitter, FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa6";

const socials = [
  { icon: FaXTwitter, href: "https://x.com/", label: "X" },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/md-abdul-ahad-linkon/",
    label: "LinkedIn",
  },
  { icon: FaGithub, href: "https://github.com/linkon63", label: "GitHub" },
  { icon: FaEnvelope, href: "mailto:m.alinkon10@gmail.com", label: "Email" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function LetsTalk() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      project: String(data.get("project") || "").trim(),
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(b.error || "Something went wrong. Please try again.");
      }
      formEl.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-6 py-12 md:py-32"
    >
      <div className="grid items-start gap-12 md:grid-cols-2">
        {/* Left: heading + socials */}
        <div className="flex h-full flex-col justify-between gap-12">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter">
              Let&apos;s talk.
            </h2>
            <p className="mt-5 max-w-md text-lg text-[var(--ink)]/70">
              Have a project or need an engineer on your team? Fill out the form
              and I&apos;ll get back to you soon.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--ink)]/10 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right: form card */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl bg-[var(--ink)] p-7 text-[var(--cream)] md:p-9"
        >
          <Field label="Name">
            <input
              name="name"
              required
              placeholder="Enter your name"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[var(--cream)] placeholder:text-[var(--cream)]/40 outline-none transition-colors focus:border-white/40"
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[var(--cream)] placeholder:text-[var(--cream)]/40 outline-none transition-colors focus:border-white/40"
            />
          </Field>
          <Field label="Your Project">
            <textarea
              name="project"
              rows={5}
              placeholder="Tell me about your project"
              className="w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[var(--cream)] placeholder:text-[var(--cream)]/40 outline-none transition-colors focus:border-white/40"
            />
          </Field>
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-xl bg-[var(--cream)] py-3.5 text-sm font-semibold text-[var(--ink)] transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {status === "sending"
              ? "Sending…"
              : status === "sent"
                ? "Message sent ✓"
                : "Submit"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-[var(--cream)]/80">
              Thanks — your message is on its way. I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-300">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[var(--cream)]/80">
        {label}
      </span>
      {children}
    </label>
  );
}
