import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

export const SITE_URL = "https://kud-sumadija.rs";

const ORG_NAME: Record<AppLocale, string> = {
  sr: "КУД Шумадија Влашка",
  en: "KUD Šumadija Vlaška",
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const suffix = ORG_NAME[locale];
  const fullTitle = title === suffix ? title : `${title} | ${suffix}`;
  const srPath = `/sr${path ? `/${path}` : ""}`;
  const enPath = `/en${path ? `/${path}` : ""}`;
  const currentPath = locale === "sr" ? srPath : enPath;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: currentPath,
      languages: { sr: srPath, en: enPath },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: currentPath,
      siteName: ORG_NAME.sr,
      locale: locale === "sr" ? "sr_RS" : "en_US",
      type: "website",
    },
  };
}
