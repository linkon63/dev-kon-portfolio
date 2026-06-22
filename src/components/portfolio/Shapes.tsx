/**
 * Decorative accent shapes for the hero. All use `fill="currentColor"` so the
 * colour can be animated from the wrapping element.
 */
type ShapeProps = { className?: string };

export function Sparkle({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 0 C54 30 70 46 100 50 C70 54 54 70 50 100 C46 70 30 54 0 50 C30 46 46 30 50 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Bolt({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M58 2 L20 56 L46 56 L40 98 L82 40 L54 40 Z" fill="currentColor" />
    </svg>
  );
}

export function Plus({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M40 4 H60 V40 H96 V60 H60 V96 H40 V60 H4 V40 H40 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Ring({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 0 A50 50 0 1 0 50 100 A50 50 0 1 0 50 0 Z M50 28 A22 22 0 1 1 50 72 A22 22 0 1 1 50 28 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function Star({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 2 L61 39 L98 50 L61 61 L50 98 L39 61 L2 50 L39 39 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Dot({ className = "" }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="currentColor" />
    </svg>
  );
}
