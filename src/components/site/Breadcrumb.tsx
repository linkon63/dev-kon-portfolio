import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink)]/50">
      <Link href="/" className="hover:text-[var(--ink)] transition-colors">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-2">
            <ChevronRight size={12} className="text-[var(--ink)]/30" />
            {isLast || !item.href ? (
              <span className="text-[var(--ink)] font-bold">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-[var(--ink)] transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
