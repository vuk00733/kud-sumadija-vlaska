import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { OrnamentDivider } from "@/components/OrnamentDivider";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { newsItems } from "@/content/news";
import type { AppLocale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const isSr = locale === "sr";

  return (
    <div>
      <section className="relative bg-[var(--color-bordo)] text-[var(--color-cream)]">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isSr ? "Културно-уметничко друштво Шумадија Влашка" : "Šumadija Vlaška Cultural and Artistic Society"}
          </h1>
          <p className="text-lg text-[var(--color-cream)]/85 max-w-2xl mx-auto">
            {isSr
              ? "Чувамо и негујемо српску народну игру, музику и ношњу кроз генерације."
              : "Preserving and nurturing Serbian folk dance, music, and costume across generations."}
          </p>
          <Link
            href="/kontakt"
            className="inline-block mt-8 rounded-full bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold px-6 py-3 hover:opacity-90"
          >
            {isSr ? "Придружи нам се" : "Join us"}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow={isSr ? "О друштву" : "About"}
          title={isSr ? "Традиција која живи" : "A living tradition"}
          subtitle={
            isSr
              ? "Више од шест деценија окупљамо играче свих узраста и преносимо богатство народне баштине Шумадије и целе Србије."
              : "For over six decades we've brought together dancers of all ages, passing on the rich folk heritage of Šumadija and all of Serbia."
          }
        />
        <div className="text-center">
          <Link href="/o-nama" className="text-[var(--color-bordo)] font-semibold hover:underline">
            {tCommon("learnMore")}
          </Link>
        </div>
      </section>

      <OrnamentDivider />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow={t("news")}
          title={isSr ? "Најновије вести" : "Latest news"}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.slice(0, 2).map((item) => (
            <article key={item.slug} className="rounded-lg overflow-hidden border border-[var(--color-gold)]/30">
              <PlaceholderArt seed={item.slug} label={item.title[locale]} className="h-48 w-full" />
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{item.title[locale]}</h3>
                <p className="text-sm text-[var(--color-navy)]/70 mb-3">{item.excerpt[locale]}</p>
                <Link href={`/vesti/${item.slug}`} className="text-[var(--color-bordo)] font-semibold text-sm hover:underline">
                  {tCommon("readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
