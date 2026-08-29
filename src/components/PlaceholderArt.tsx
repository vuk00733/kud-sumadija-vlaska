function hueFromSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  return hash;
}

export function PlaceholderArt({
  seed,
  label,
  className,
}: {
  seed: string;
  label: string;
  className?: string;
}) {
  const hue = hueFromSeed(seed);
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 88%), hsl(${(hue + 40) % 360} 40% 78%))`,
      }}
      role="img"
      aria-label={label}
    >
      <svg width="64" height="64" viewBox="0 0 28 28" className="text-white/70">
        <path
          d="M14 2 L18 10 L26 14 L18 18 L14 26 L10 18 L2 14 L10 10 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
