import { createClient } from "@sanity/client";
import type { NewsItem, EventItem, GalleryItem } from "@/content/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const client =
  projectId &&
  createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });

async function fetchOrEmpty<T>(query: string): Promise<T[]> {
  if (!client) return [];
  return client.fetch<T[]>(query);
}

export async function getNewsItems(): Promise<NewsItem[]> {
  return fetchOrEmpty<NewsItem>(
    `*[_type == "newsPost"] | order(date desc) {
      "slug": slug.current,
      date,
      "title": {"sr": titleSr, "en": titleEn},
      "excerpt": {"sr": excerptSr, "en": excerptEn},
      "body": {"sr": bodySr, "en": bodyEn}
    }`
  );
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItem | null> {
  if (!client) return null;
  const items = await client.fetch<NewsItem[]>(
    `*[_type == "newsPost" && slug.current == $slug] {
      "slug": slug.current,
      date,
      "title": {"sr": titleSr, "en": titleEn},
      "excerpt": {"sr": excerptSr, "en": excerptEn},
      "body": {"sr": bodySr, "en": bodyEn}
    }`,
    { slug }
  );
  return items[0] ?? null;
}

export async function getAllNewsSlugs(): Promise<string[]> {
  return fetchOrEmpty<string>(`*[_type == "newsPost"].slug.current`);
}

export async function getEventItems(): Promise<EventItem[]> {
  return fetchOrEmpty<EventItem>(
    `*[_type == "event"] | order(date asc) {
      "id": _id,
      date,
      "title": {"sr": titleSr, "en": titleEn},
      "location": {"sr": locationSr, "en": locationEn},
      "description": {"sr": descriptionSr, "en": descriptionEn}
    }`
  );
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return fetchOrEmpty<GalleryItem>(
    `*[_type == "galleryItem"] | order(order asc) {
      "id": _id,
      "category": {"sr": categorySr, "en": categoryEn},
      "caption": {"sr": captionSr, "en": captionEn},
      "imageUrl": image.asset->url
    }`
  );
}
