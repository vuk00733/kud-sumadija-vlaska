import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/metadata";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "kontakt",
    title: locale === "sr" ? "Контакт" : "Contact",
    description:
      locale === "sr"
        ? "Пронађите нас — адреса, контакт и мапа проба."
        : "Find us — address, contact, and rehearsal map.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading eyebrow={isSr ? "Контакт" : "Contact"} title={isSr ? "Пронађите нас" : "Find us"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3 text-[var(--color-navy)]/90">
          <p>
            <strong>{isSr ? "Адреса проба:" : "Rehearsal address:"}</strong><br />
            {isSr ? "Дом културе, Крагујевац" : "House of Culture, Kragujevac"}
          </p>
          {/* TODO: verify this is the society's real email before launch */}
          <p>
            <strong>Email:</strong><br />
            <a href="mailto:info@kud-sumadija.rs" className="text-[var(--color-bordo)] hover:underline">
              info@kud-sumadija.rs
            </a>
          </p>
          {/* TODO: replace with the society's real phone number before launch */}
          <p>
            <strong>{isSr ? "Телефон:" : "Phone:"}</strong><br />
            +381 34 000 000
          </p>
          <a
            href="mailto:info@kud-sumadija.rs?subject=Upit sa sajta"
            className="inline-block mt-4 rounded-full bg-[var(--color-bordo)] text-[var(--color-cream)] font-semibold px-6 py-3 hover:opacity-90"
          >
            {isSr ? "Пошаљи нам поруку" : "Send us a message"}
          </a>
        </div>
        <iframe
          title={isSr ? "Мапа локације проба" : "Rehearsal location map"}
          className="w-full h-64 md:h-full rounded-lg border-0"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=20.90%2C44.00%2C20.95%2C44.03&layer=mapnik"
        />
      </div>
    </div>
  );
}
