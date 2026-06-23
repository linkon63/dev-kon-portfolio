"use client";

import Link from "next/link";
import { useResumeUrl } from "@/lib/useResume";
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  const resumeUrl = useResumeUrl();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Me" },
    { href: "/#services", label: "Services" },
    { href: "/#work", label: "Works" },
    { href: "/#contact", label: "Contact" },
    { href: "/allProject", label: "All Projects" },
    { href: "/blogs", label: "Thoughts" },
    { href: resumeUrl, label: "Resume", external: true },
  ];

  return (
    <footer className="relative overflow-hidden bg-[var(--ink)] text-[var(--cream)]">
      <div className="relative z-10 mx-auto grid gap-12 px-6 pt-20 pb-40 md:grid-cols-4 md:pb-48">
        <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          Building Software
          <br />
          for Scale.
        </h2>

        <div>
          <p className="mb-5 text-xl text-[var(--cream)]/80">/Quick links</p>
          <div className="flex flex-wrap gap-2.5">
            {quickLinks.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[var(--cream)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg bg-[var(--cream)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              );
            })}
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

        <div>
          <p className="mb-5 text-xl text-[var(--cream)]/80">/Connected with me</p>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/8801712508063?text=Hi%20Linkon%2C%20I%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20connect%20regarding%20a%20project/job%20opportunity%21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[var(--cream)] transition-colors hover:bg-white hover:text-[var(--ink)]"
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-abdul-ahad-linkon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[var(--cream)] transition-colors hover:bg-white hover:text-[var(--ink)]"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://github.com/linkon63"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[var(--cream)] transition-colors hover:bg-white hover:text-[var(--ink)]"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="mailto:m.alinkon10@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[var(--cream)] transition-colors hover:bg-white hover:text-[var(--ink)]"
            >
              <FaEnvelope size={18} />
            </a>
          </div>
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
          © {new Date().getFullYear()} Md Abdul Ahad Linkon — Software Engineer.
        </p>
      </div>
    </footer>
  );
}
