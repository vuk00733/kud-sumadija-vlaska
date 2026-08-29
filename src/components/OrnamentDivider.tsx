export function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6" aria-hidden="true">
      <span className="h-px w-16 bg-[var(--color-gold)]" />
      <svg width="28" height="28" viewBox="0 0 28 28" className="text-[var(--color-gold)]">
        <path
          d="M14 2 L18 10 L26 14 L18 18 L14 26 L10 18 L2 14 L10 10 Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-16 bg-[var(--color-gold)]" />
    </div>
  );
}
