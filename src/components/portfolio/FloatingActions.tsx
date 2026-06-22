/**
 * Fixed bottom-right CTA stack — the design's persistent action dock, repurposed
 * from the reference's template buttons into real portfolio actions.
 */
export default function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-40 hidden flex-col items-end gap-2 md:flex">
      <a
        href="mailto:m.alinkon10@gmail.com"
        className="rounded-xl bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] shadow-lg transition-transform hover:scale-[1.03]"
      >
        Hire Me
      </a>
      <a
        href="/files/Resume-V12.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] shadow-lg transition-transform hover:scale-[1.03]"
      >
        Resume
      </a>
    </div>
  );
}
