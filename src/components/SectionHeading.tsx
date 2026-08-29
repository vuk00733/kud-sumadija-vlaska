export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      {eyebrow && (
        <p className="uppercase tracking-widest text-sm text-[var(--color-bordo)] font-semibold mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--color-navy)]/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
