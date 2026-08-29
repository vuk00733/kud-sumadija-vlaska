import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { repertoireRegions } from "@/content/repertoire";
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
    path: "repertoar",
    title: locale === "sr" ? "Репертоар" : "Repertoire",
    description:
      locale === "sr"
        ? "Игре и ношње по крајевима Србије у нашем репертоару."
        : "Dances and costumes by region in our repertoire.",
  });
}

export default async function RepertoirePage({
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
        eyebrow={isSr ? "Репертоар" : "Repertoire"}
        title={isSr ? "Игре и ношње по крајевима" : "Dances and costumes by region"}
      />
      <div className="space-y-12">
        {repertoireRegions.map((region) => (
          <div key={region.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <PlaceholderArt seed={region.id} label={region.region[locale]} className="h-56 w-full rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-bordo)] mb-2">{region.region[locale]}</h3>
              <ul className="list-disc list-inside mb-3 text-[var(--color-navy)]/90">
                {region.dances.map((dance) => (
                  <li key={dance[locale]}>{dance[locale]}</li>
                ))}
              </ul>
              <p className="text-sm text-[var(--color-navy)]/70">{region.costumeNote[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
