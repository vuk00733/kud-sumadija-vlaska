import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { OrnamentDivider } from "@/components/OrnamentDivider";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "О нама | КУД Шумадија Влашка" : "About | KUD Šumadija Vlaška",
    description:
      locale === "sr"
        ? "Историја и мисија Културно-уметничког друштва Шумадија Влашка."
        : "History and mission of KUD Šumadija Vlaška.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading
        eyebrow={isSr ? "О друштву" : "About us"}
        title={isSr ? "Наша историја" : "Our history"}
      />
      <div className="prose max-w-none text-[var(--color-navy)]/90 space-y-4">
        <p>
          {isSr
            ? "Културно-уметничко друштво Шумадија Влашка основано је са циљем да чува и негује традицију народне игре, музике и ношње нашег краја. Кроз рад са децом, омладином и одраслима, друштво данас окупља неколико стотина чланова."
            : "KUD Šumadija Vlaška was founded to preserve and nurture the tradition of folk dance, music, and costume of our region. Through work with children, youth, and adults, the society today brings together several hundred members."}
        </p>
        <p>
          {isSr
            ? "Наша мисија је да младе генерације упознамо са богатством народне баштине и да је представљамо публици у Србији и иностранству."
            : "Our mission is to introduce younger generations to the richness of folk heritage and present it to audiences in Serbia and abroad."}
        </p>
      </div>
      <OrnamentDivider />
    </div>
  );
}
