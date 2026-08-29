import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

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

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <header className="relative z-50 border-b border-[var(--color-gold)]/40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-[var(--color-bordo)]">
          {tCommon("orgName")}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--color-bordo)]">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
