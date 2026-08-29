"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const links = [
  { href: "/", key: "home" },
  { href: "/o-nama", key: "about" },
  { href: "/sekcije", key: "sections" },
  { href: "/repertoar", key: "repertoire" },
  { href: "/vesti", key: "news" },
  { href: "/dogadjaji", key: "events" },
  { href: "/galerija", key: "gallery" },
  { href: "/kontakt", key: "contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        aria-expanded={open}
        className="p-2 text-[var(--color-navy)]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-full bg-[var(--color-cream)] border-t border-[var(--color-gold)]/40 shadow-lg">
          <ul className="flex flex-col p-4 gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 text-[var(--color-navy)] font-medium"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
