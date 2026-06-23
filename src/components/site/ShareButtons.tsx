"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa6";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      label: "Share on X",
      icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 text-sm font-semibold text-[var(--ink)]/55">Share</span>

      {shares.map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ink)]/15 text-[var(--ink)]/70 transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
          >
            <Icon size={16} />
          </a>
        );
      })}

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ink)]/15 text-[var(--ink)]/70 transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
