import Link from "next/link";

const quickLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About Me" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Works" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--ink)] text-[var(--cream)]">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-40 md:grid-cols-3 md:pb-48">
        <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          Building Software
          <br />
          for Scale.
        </h2>

        <div>
          <p className="mb-5 text-xl text-[var(--cream)]/80">/Quick links</p>
          <div className="flex flex-wrap gap-2.5">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg bg-[var(--cream)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 text-xl text-[var(--cream)]/80">/Contact</p>
          <a
            href="mailto:m.alinkon10@gmail.com"
            className="text-[var(--cream)]/90 transition-colors hover:text-[var(--cream)]"
          >
            m.alinkon10@gmail.com
          </a>
          <p className="mt-2 text-[var(--cream)]/60">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Oversized watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none text-center text-[28vw] leading-none font-extrabold tracking-tighter text-white/[0.04] md:-bottom-10"
      >
        LINKON
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-6">
        <p className="text-xs text-[var(--cream)]/40">
          © 2026 Md Abdul Ahad Linkon — Software Engineer.
        </p>
      </div>
    </footer>
  );
}
