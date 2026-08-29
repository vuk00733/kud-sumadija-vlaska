import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { Link } from "@/i18n/navigation";
import { newsItems } from "@/content/news";
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
    path: "vesti",
    title: locale === "sr" ? "Вести" : "News",
    description:
      locale === "sr"
        ? "Све вести Културно-уметничког друштва Шумадија Влашка."
        : "All news from KUD Šumadija Vlaška.",
  });
}

export default async function NewsListPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  const sorted = [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading eyebrow={isSr ? "Вести" : "News"} title={isSr ? "Све вести" : "All news"} />
      <div className="space-y-8">
        {sorted.map((item) => (
          <article key={item.slug} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 border-b border-[var(--color-gold)]/30 pb-8">
            <PlaceholderArt seed={item.slug} label={item.title[locale]} className="h-32 w-full rounded-lg" />
            <div>
              <time className="text-xs uppercase tracking-wide text-[var(--color-navy)]/50">{item.date}</time>
              <h3 className="font-bold text-xl mt-1 mb-2">{item.title[locale]}</h3>
              <p className="text-sm text-[var(--color-navy)]/70 mb-3">{item.excerpt[locale]}</p>
              <Link href={`/vesti/${item.slug}`} className="text-[var(--color-bordo)] font-semibold text-sm hover:underline">
                {isSr ? "Прочитај више" : "Read more"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
