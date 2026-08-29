import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[var(--color-gold)]/40 bg-[var(--color-navy)] text-[var(--color-cream)] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row md:justify-between gap-4">
        <p>КУД Шумадија Влашка</p>
        <p>{t("address")}</p>
        <p>&copy; {new Date().getFullYear()} КУД Шумадија Влашка. {t("rights")}</p>
      </div>
    </footer>
  );
}
