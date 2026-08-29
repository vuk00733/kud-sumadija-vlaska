import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getAllNewsSlugs, getNewsItemBySlug } from "@/lib/sanity";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getNewsItemBySlug(slug);
  if (!item) return {};
  return buildMetadata({
    locale,
    path: `vesti/${slug}`,
    title: item.title[locale],
    description: item.excerpt[locale],
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = await getNewsItemBySlug(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <time className="text-xs uppercase tracking-wide text-[var(--color-navy)]/50">{item.date}</time>
      <h1 className="text-3xl font-bold mt-2 mb-6">{item.title[locale]}</h1>
      <p className="text-[var(--color-navy)]/90 leading-relaxed whitespace-pre-line">{item.body[locale]}</p>
      <Link href="/vesti" className="inline-block mt-8 text-[var(--color-bordo)] font-semibold hover:underline">
        {locale === "sr" ? "← Назад на вести" : "← Back to news"}
      </Link>
    </article>
  );
}
