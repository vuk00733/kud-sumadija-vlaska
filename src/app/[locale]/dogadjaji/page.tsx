import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { getEventItems } from "@/lib/sanity";
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
    path: "dogadjaji",
    title: locale === "sr" ? "Догађаји" : "Events",
    description:
      locale === "sr"
        ? "Предстојећи наступи Културно-уметничког друштва Шумадија Влашка."
        : "Upcoming performances by KUD Šumadija Vlaška.",
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";
  // Static export freezes "today" at build time — redeploy periodically to keep this accurate.
  const today = new Date().toISOString().slice(0, 10);
  const eventItems = await getEventItems();
  const sorted = [...eventItems]
    .filter((event) => event.date >= today)
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading eyebrow={isSr ? "Догађаји" : "Events"} title={isSr ? "Предстојећи наступи" : "Upcoming performances"} />
      <div className="space-y-6">
        {sorted.map((event) => (
          <div key={event.id} className="flex gap-5 border-l-4 border-[var(--color-gold)] pl-5 py-2">
            <div className="min-w-[90px] font-bold text-[var(--color-bordo)]">{event.date}</div>
            <div>
              <h3 className="font-bold text-lg">{event.title[locale]}</h3>
              <p className="text-sm text-[var(--color-navy)]/60">{event.location[locale]}</p>
              <p className="text-sm text-[var(--color-navy)]/80 mt-1">{event.description[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}