import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24"
    >
      <div className="border-t border-[var(--ink)]/15 pt-12">
        <p className="text-sm font-medium tracking-[0.2em] text-[var(--ink)]/50 uppercase">
          / Let&apos;s build something
        </p>
        <a
          href="mailto:m.alinkon10@gmail.com"
          className="group mt-6 inline-flex items-center gap-4 text-4xl font-extrabold tracking-tighter md:text-7xl"
        >
          m.alinkon10@gmail.com
          <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:h-14 md:w-14" />
        </a>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <span className="text-sm text-[var(--ink)]/60">
            © 2026 Md Abdul Ahad Linkon — Software Engineer, Dhaka.
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/md-abdul-ahad-linkon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--ink)]/20 transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/linkon63"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--ink)]/20 transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
