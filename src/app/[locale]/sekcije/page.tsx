import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { sectionItems } from "@/content/sections";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "Секције | КУД Шумадија Влашка" : "Sections | KUD Šumadija Vlaška",
  };
}

export default async function SectionsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow={isSr ? "Секције" : "Sections"}
        title={isSr ? "Наши ансамбли" : "Our ensembles"}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sectionItems.map((section) => (
          <div key={section.id} className="rounded-lg overflow-hidden border border-[var(--color-gold)]/30">
            <PlaceholderArt seed={section.id} label={section.name[locale]} className="h-40 w-full" />
            <div className="p-5">
              <h3 className="font-bold text-lg">{section.name[locale]}</h3>
              <p className="text-sm text-[var(--color-bordo)] font-semibold mb-2">{section.ageRange[locale]}</p>
              <p className="text-sm text-[var(--color-navy)]/70">{section.description[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
