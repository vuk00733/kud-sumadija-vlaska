import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { galleryItems } from "@/content/gallery";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "Галерија | КУД Шумадија Влашка" : "Gallery | KUD Šumadija Vlaška",
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow={isSr ? "Галерија" : "Gallery"} title={isSr ? "Фотографије и тренуци" : "Photos and moments"} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="rounded-lg overflow-hidden">
            <PlaceholderArt seed={item.id} label={item.caption[locale]} className="h-40 w-full" />
            <p className="text-xs text-[var(--color-navy)]/60 mt-1">{item.caption[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}