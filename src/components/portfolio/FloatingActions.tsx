"use client";

import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";

type Action = {
  label: string;
  href: string;
  icon: IconType;
};

const actions: Action[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/8801712508063?text=Hi%20Linkon%2C%20I%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20connect%20regarding%20a%20project/job%20opportunity%21",
    icon: FaWhatsapp,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-abdul-ahad-linkon/",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/linkon63",
    icon: FaGithub,
  },
];

/**
 * Sticky social rail pinned to the right edge and vertically centred.
 * Displays WhatsApp, LinkedIn, and GitHub. (The Resume CTA now lives in the
 * animated ResumeButton pinned to the top-left corner.)
 */
export default function FloatingActions() {
  return (
    <div className="fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col items-end gap-1.5">
      {actions.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex items-center justify-end overflow-hidden rounded-l-xl border-y border-l border-[var(--cream)]/15 bg-[var(--ink)] text-[var(--cream)] shadow-lg transition-all duration-300"
        >
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:pl-4 group-hover:opacity-100">
            {label}
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center text-lg font-bold">
            <Icon />
          </span>
        </a>
      ))}
    </div>
  );
}
