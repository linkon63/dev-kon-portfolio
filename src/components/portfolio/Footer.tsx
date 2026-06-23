"use client";

import { useRef } from "react";
import Link from "next/link";
import { useResumeUrl } from "@/lib/useResume";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaKaggle,
  FaGitlab,
  FaGraduationCap,
  FaHackerrank,
  FaFreeCodeCamp,
  FaAward,
  FaTrophy,
  FaMedal,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { SiIeee, SiCoursera } from "react-icons/si";
import type { IconType } from "react-icons";
import { AnimatePresence, motion, useInView } from "motion/react";

export default function Footer() {
  const resumeUrl = useResumeUrl();
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.05 });

  const quickLinks: {
    href: string;
    label: string;
    external?: boolean;
    highlight?: boolean;
  }[] = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Me" },
    { href: "/#experience", label: "Experience" },
    { href: "/#services", label: "Services" },
    { href: "/#work", label: "Works" },
    { href: "/#contact", label: "Contact" },
    { href: "/allProject", label: "All Projects", highlight: true },
    { href: "/blogs", label: "Thoughts", highlight: true },
    { href: resumeUrl, label: "Resume", external: true, highlight: true },
  ];

  // External profile links
  const externalLinks: { href?: string; label: string; icon: IconType; highlight?: boolean }[] = [
    { href: "https://www.kaggle.com/mdabdulahadlinkon", label: "Kaggle", icon: FaKaggle },
    { href: "https://gitlab.com/linkon063", label: "GitLab", icon: FaGitlab },
    { label: "IUBAT Alumni", icon: FaGraduationCap },
    { href: "https://ieeexplore.ieee.org/abstract/document/11429201", label: "IEEE Publication", icon: SiIeee, highlight: true },
  ];

  // Certifications grouped by issuer (items without a verify link stay plain text)
  const certifications: {
    provider: string;
    icon: IconType;
    items: { label: string; href?: string }[];
  }[] = [
    {
      provider: "HackerRank",
      icon: FaHackerrank,
      items: [
        { label: "JavaScript (Intermediate)", href: "https://www.hackerrank.com/certificates/9d39ce98c5d4" },
        { label: "SQL (Intermediate)", href: "https://www.hackerrank.com/certificates/7954ec279867" },
      ],
    },
    {
      provider: "freeCodeCamp",
      icon: FaFreeCodeCamp,
      items: [
        { label: "Frontend Development Libraries", href: "https://www.freecodecamp.org/certification/linkon63/front-end-development-libraries" },
        { label: "Backend Development and APIs" },
        { label: "JavaScript Algorithms and Data Structures", href: "https://www.freecodecamp.org/certification/linkon63/javascript-algorithms-and-data-structures" },
        { label: "Responsive Web Design", href: "https://www.freecodecamp.org/certification/linkon63/responsive-web-design" },
      ],
    },
    {
      provider: "Coursera",
      icon: SiCoursera,
      items: [
        { label: "Data Science Math Skills", href: "https://www.coursera.org/account/accomplishments/verify/UWL2DN8IXVZM" },
      ],
    },
  ];

  // Awards, honors & recognition
  const awards: { title: string; detail: string; icon: IconType; href?: string; highlight?: boolean }[] = [
    {
      title: "IUBAT Scholar — Dean's List",
      detail: "Perfect 4.00 GPA semester · CGPA 3.61 in BSc CSE",
      icon: FaAward,
    },
    {
      title: "Hackathon Finalist",
      detail: "Dhaka Division Hackathon — public safety solution",
      icon: FaTrophy,
    },
    {
      title: "Hult Prize Runners-up",
      detail: "IUBAT regional round — sustainable social enterprise",
      icon: FaMedal,
      href: "https://drive.google.com/file/d/1IVgqehTaAO9O5pvFgERz6tn53nETCOi0/view?usp=sharing",
      highlight: true,
    },
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[var(--ink)]/10 bg-[var(--cream)] text-[var(--ink)]">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-28 md:pb-32">
        {/* Top band: brand + contact + socials */}
        <div className="flex flex-col gap-8 border-b border-[var(--ink)]/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Building Software
              <br />
              for Scale.
            </h2>
            <a
              href="mailto:m.alinkon10@gmail.com"
              className="mt-5 inline-block text-base text-[var(--ink)]/85 transition-colors hover:text-[var(--ink)]"
            >
              m.alinkon10@gmail.com
            </a>
            <p className="mt-1 text-sm text-[var(--ink)]/50">Dhaka, Bangladesh · Open to Remote</p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2.5">
            {[
              { href: "https://wa.me/8801712508063?text=Hi%20Linkon%2C%20I%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20connect%20regarding%20a%20project/job%20opportunity%21", label: "WhatsApp", icon: FaWhatsapp },
              { href: "https://www.linkedin.com/in/md-abdul-ahad-linkon/", label: "LinkedIn", icon: FaLinkedinIn },
              { href: "https://github.com/linkon63", label: "GitHub", icon: FaGithub },
              { href: "mailto:m.alinkon10@gmail.com", label: "Email", icon: FaEnvelope },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--ink)]/8 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Link groups */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {/* Quick links */}
          <div>
            <p className="mb-4 text-base font-bold uppercase tracking-[0.12em] text-[var(--ink)]/80 md:text-lg">
              Quick links
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => {
                const cls = link.highlight
                  ? "inline-flex items-center gap-1 rounded-md bg-[var(--ink)] px-2.5 py-1 text-sm font-bold text-[var(--cream)] transition-transform hover:-translate-y-0.5"
                  : "inline-block text-sm text-[var(--ink)]/70 transition-all hover:translate-x-0.5 hover:text-[var(--ink)]";
                return (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls}
                      >
                        {link.label}
                        {link.highlight && (
                          <FaArrowUpRightFromSquare size={10} className="opacity-70" />
                        )}
                      </a>
                    ) : (
                      <Link href={link.href} className={cls}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <p className="mb-4 text-base font-bold uppercase tracking-[0.12em] text-[var(--ink)]/80 md:text-lg">
              External
            </p>
            <ul className="space-y-2.5">
              {externalLinks.map((link) => {
                const Icon = link.icon;
                if (link.highlight) {
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-3 py-1.5 text-sm font-semibold text-[var(--cream)] shadow-sm transition-transform hover:-translate-y-0.5"
                      >
                        <Icon size={14} className="shrink-0" />
                        {link.label}
                        <FaArrowUpRightFromSquare size={10} className="opacity-70" />
                      </a>
                    </li>
                  );
                }
                if (!link.href) {
                  return (
                    <li key={link.label}>
                      <span className="flex items-center gap-2 text-sm text-[var(--ink)]/70">
                        <Icon size={14} className="shrink-0 opacity-60" />
                        {link.label}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-[var(--ink)]/70 transition-colors hover:text-[var(--ink)]"
                    >
                      <Icon size={14} className="shrink-0 opacity-60 group-hover:opacity-100" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <p className="mb-4 text-base font-bold uppercase tracking-[0.12em] text-[var(--ink)]/80 md:text-lg">
              Certifications
            </p>
            <div className="space-y-3.5">
              {certifications.map((cert) => {
                const Icon = cert.icon;
                return (
                  <div key={cert.provider}>
                    <p className="mb-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ink)]/85">
                      <Icon size={13} className="shrink-0" />
                      {cert.provider}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.items.map((item) =>
                        item.href ? (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 rounded-md border border-[var(--ink)]/20 px-2 py-0.5 text-[11px] font-medium text-[var(--ink)]/75 transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)]"
                          >
                            {item.label}
                            <FaArrowUpRightFromSquare size={8} className="opacity-50 group-hover:opacity-100" />
                          </a>
                        ) : (
                          <span
                            key={item.label}
                            className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] text-[var(--ink)]/40"
                          >
                            {item.label}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div>
            <p className="mb-4 text-base font-bold uppercase tracking-[0.12em] text-[var(--ink)]/80 md:text-lg">
              Awards
            </p>
            <ul className="space-y-2.5">
              {awards.map((award) => {
                const Icon = award.icon;
                const baseCls = `group flex items-start gap-2.5 rounded-lg transition-colors ${
                  award.highlight
                    ? "bg-[var(--ink)]/[0.06] p-2.5 ring-1 ring-[var(--ink)]/15 hover:bg-[var(--ink)]/[0.1]"
                    : "p-0.5"
                }`;
                const inner = (
                  <>
                    <span
                      className={`mt-0.5 grid shrink-0 place-items-center rounded-md ${
                        award.highlight
                          ? "h-6 w-6 bg-[var(--ink)] text-[var(--cream)]"
                          : "text-[var(--ink)]/60"
                      }`}
                    >
                      <Icon size={award.highlight ? 12 : 14} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 text-[13px] font-semibold leading-snug text-[var(--ink)]/85">
                        {award.title}
                        {award.highlight && (
                          <FaArrowUpRightFromSquare size={9} className="shrink-0 opacity-60" />
                        )}
                      </span>
                      <span className="block text-[11px] leading-snug text-[var(--ink)]/45">
                        {award.detail}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={award.title}>
                    {award.href ? (
                      <a
                        href={award.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={baseCls}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={baseCls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none text-center text-[28vw] leading-none font-extrabold tracking-tighter text-[var(--ink)]/[0.04] md:-bottom-10"
      >
        LINKON
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-6">
        <p className="text-xs text-[var(--ink)]/40">
          © {new Date().getFullYear()} Md Abdul Ahad Linkon — Software Engineer.
        </p>
      </div>

      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="fixed bottom-0 left-6 z-40 flex flex-col items-center pointer-events-none"
          >
            {/* Speech bubble */}
            <Link
              href="/#contact"
              className="group pointer-events-auto relative mb-3.5 rounded-2xl bg-[var(--ink)] px-4 py-2 text-[11px] sm:text-xs font-semibold text-[var(--cream)] shadow-2xl border border-[var(--cream)]/10 whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-neutral-950 dark:hover:bg-neutral-900 active:scale-95"
            >
              Goodbye! Let&apos;s connect! 👋
              {/* Triangle pointer */}
              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[var(--ink)] border-r border-b border-[var(--cream)]/10 group-hover:border-[var(--cream)]/30 group-hover:bg-neutral-950 dark:group-hover:bg-neutral-900 transition-all duration-300" />
            </Link>

            {/* Panda Sticker */}
            <div className="w-24 h-24 sm:w-28 sm:h-28">
              <img
                src="https://media.giphy.com/media/cXarpuLXIP9TJV4p9I/giphy.gif"
                alt="Panda Sticker"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
