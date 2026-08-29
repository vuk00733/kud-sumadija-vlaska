import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { getGalleryItems } from "@/lib/sanity";
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
    path: "galerija",
    title: locale === "sr" ? "Галерија" : "Gallery",
    description:
      locale === "sr"
        ? "Фотографије и тренуци Културно-уметничког друштва Шумадија Влашка."
        : "Photos and moments from KUD Šumadija Vlaška.",
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";
  const galleryItems = await getGalleryItems();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow={isSr ? "Галерија" : "Gallery"} title={isSr ? "Фотографије и тренуци" : "Photos and moments"} />
      {galleryItems.length === 0 ? (
        <p className="text-center text-[var(--color-navy)]/60">
          {isSr ? "Фотографије ће ускоро бити додате." : "Photos will be added soon."}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${item.imageUrl}?w=600&h=450&fit=crop&auto=format`}
                alt={item.caption[locale]}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
              <p className="text-xs text-[var(--color-navy)]/60 mt-1">{item.caption[locale]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
