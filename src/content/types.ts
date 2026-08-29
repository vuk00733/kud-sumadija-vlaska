export type Localized = {
  sr: string;
  en: string;
};

export type NewsItem = {
  slug: string;
  date: string; // ISO 8601
  title: Localized;
  excerpt: Localized;
  body: Localized;
};

export type EventItem = {
  id: string;
  date: string; // ISO 8601
  title: Localized;
  location: Localized;
  description: Localized;
};

export type SectionItem = {
  id: string;
  name: Localized;
  description: Localized;
  ageRange: Localized;
};

export type RepertoireRegion = {
  id: string;
  region: Localized;
  dances: Localized[];
  costumeNote: Localized;
};

export type GalleryItem = {
  id: string;
  category: Localized;
  caption: Localized;
  imageUrl: string;
};
