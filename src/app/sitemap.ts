import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getNewsItems } from "@/lib/sanity";
import { SITE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

const staticPaths = [
  "",
  "o-nama",
  "sekcije",
  "repertoar",
  "vesti",
  "dogadjaji",
  "galerija",
  "kontakt",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const newsItems = await getNewsItems();

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path ? `/${path}` : ""}`,
        lastModified: new Date(),
      });
    }
    for (const item of newsItems) {
      entries.push({
        url: `${SITE_URL}/${locale}/vesti/${item.slug}`,
        lastModified: item.date,
      });
    }
  }

  return entries;
}
