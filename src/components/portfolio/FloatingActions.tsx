import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { FileText, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

type Action = {
  label: string;
  href: string;
  icon: IconType | LucideIcon;
  external?: boolean;
};

const actions: Action[] = [
  { label: "Hire Me", href: "mailto:m.alinkon10@gmail.com", icon: FaEnvelope },
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
  { label: "X", href: "https://x.com/", icon: FaXTwitter, external: true },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801712508063",
    icon: FaWhatsapp,
    external: true,
  },
];

/**
 * Sticky social/CTA rail pinned to the right edge and vertically centred.
 * Each square button reveals its label by sliding out to the left on hover.
 */
export default function FloatingActions() {
  return (
    <div className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col items-end gap-1.5 md:flex">
      {actions.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
          className="group flex items-center justify-end overflow-hidden rounded-l-xl bg-[var(--ink)] text-[var(--cream)] shadow-lg"
        >
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:pl-4 group-hover:opacity-100">
            {label}
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center text-lg">
            <Icon />
          </span>
        </a>
      ))}
    </div>
  );
}
