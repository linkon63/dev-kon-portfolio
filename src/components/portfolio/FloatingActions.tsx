"use client";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { FileText, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { useResumeUrl } from "@/lib/useResume";

type Action = {
  label: string;
  href: string;
  icon: IconType | LucideIcon;
  external?: boolean;
};

const actions: Action[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/8801712508063?text=Hi%20Linkon%2C%20I%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20connect%20regarding%20a%20project/job%20opportunity%21",
    icon: FaWhatsapp,
    external: true,
  },
  {
    label: "See Resume",
    href: "/files/Resume-V12.pdf",
    icon: FileText,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-abdul-ahad-linkon/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/linkon63",
    icon: FaGithub,
    external: true,
  },
];

/**
 * Sticky social/CTA rail pinned to the right edge and vertically centred.
 * Displays WhatsApp, See Resume, LinkedIn, and GitHub.
 * The Resume option is highlighted ("selected") with a distinct light theme.
 */
export default function FloatingActions() {
  const resumeUrl = useResumeUrl();
  return (
    <div className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col items-end gap-1.5 md:flex">
      {actions.map(({ label, href, icon: Icon, external }) => {
        const isResume = label === "See Resume";
        return (
          <a
            key={label}
            href={isResume ? resumeUrl : href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={label}
            className={`group flex items-center justify-end overflow-hidden rounded-l-xl shadow-lg border-y border-l transition-all duration-300 ${
              isResume
                ? "bg-[var(--cream)] text-[var(--ink)] border-[var(--ink)]/20 hover:bg-neutral-100 scale-105"
                : "bg-[var(--ink)] text-[var(--cream)] border-transparent"
            }`}
          >
            <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:pl-4 group-hover:opacity-100">
              {label}
            </span>
            <span className="grid h-12 w-12 shrink-0 place-items-center text-lg font-bold">
              <Icon />
            </span>
          </a>
        );
      })}
    </div>
  );
}
