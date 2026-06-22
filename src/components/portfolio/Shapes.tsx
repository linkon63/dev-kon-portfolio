/**
 * Glossy black decorative shapes used as accents in the hero, echoing the
 * "3D sticker" sparkle and lightning bolt from the reference design. Rendered
 * as inline SVG so they stay crisp and need no extra assets.
 */

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sparkleEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="50%" stopColor="#0d0d0c" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <path
        d="M50 0 C54 30 70 46 100 50 C70 54 54 70 50 100 C46 70 30 54 0 50 C30 46 46 30 50 0 Z"
        fill="url(#sparkleEdge)"
      />
    </svg>
  );
}

export function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="boltEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="70%" stopColor="#0d0d0c" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <path
        d="M58 2 L20 56 L46 56 L40 98 L82 40 L54 40 Z"
        fill="url(#boltEdge)"
      />
    </svg>
  );
}
