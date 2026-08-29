"use client";

import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import NextLink from "next/link";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      {routing.locales.map((locale) => (
        <NextLink
          key={locale}
          href={`/${locale}${pathname === "/" ? "" : pathname}`}
          className={
            locale === activeLocale
              ? "text-[var(--color-bordo)] underline underline-offset-4"
              : "text-[var(--color-navy)]/60 hover:text-[var(--color-bordo)]"
          }
        >
          {locale.toUpperCase()}
        </NextLink>
      ))}
    </div>
  );
}
