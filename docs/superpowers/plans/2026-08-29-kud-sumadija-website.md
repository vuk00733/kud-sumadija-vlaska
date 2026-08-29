# KUD Šumadija Vlaška Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, bilingual (sr-Cyrillic default / en), mobile-first Next.js website for KUD Šumadija Vlaška, deployable to Vercel with zero config.

**Architecture:** Next.js 15 App Router with `output: 'export'` (fully static HTML/CSS/JS, no server). Bilingual routing via `next-intl` using an always-prefixed `[locale]` segment (`/sr/...`, `/en/...`) — no middleware, since static export doesn't support it. All content (news, events, sections, repertoire, gallery) lives in typed TypeScript data modules under `src/content/`, not a database or CMS.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, next-intl v3, static export.

**Spec:** `docs/superpowers/specs/2026-08-29-kud-sumadija-website-design.md`

## Global Constraints

- Static export only: `next.config.ts` must set `output: 'export'`. No API routes, no middleware, no server actions.
- Two locales only: `sr` (Ćirilica, default) and `en`. Locale prefix mode is `always` (`/sr/...`, `/en/...`); bare `/` redirects to `/sr`.
- All content is static data in `src/content/*.ts` — no CMS, no database, no fetch calls.
- Images: no real photography exists yet. Use inline SVG placeholder art (ornament-motif based) so the site builds and looks intentional without real photos. Document in README where to drop real photos later.
- Color palette: cream/white background (`--color-cream: #faf6ef`), bordo accent (`--color-bordo: #7a1f2b`), gold accent (`--color-gold: #c9a24b`), dark navy secondary (`--color-navy: #1f2a3c`).
- This is a content/markup-heavy static site with no business logic to unit-test. "Tests" in this plan mean: `npm run build` succeeds, and the generated static HTML in `out/` contains expected strings (verified via `grep`). There is no unit test framework in this plan — do not add one.
- Every page must exist in both `/sr` and `/en` and must not crash `next build`.

---

## File Structure

```
kud-sumadija/
  next.config.ts
  tsconfig.json
  package.json
  postcss.config.mjs
  README.md
  messages/
    sr.json
    en.json
  src/
    i18n/
      routing.ts
      request.ts
      navigation.ts
    content/
      types.ts
      news.ts
      events.ts
      sections.ts
      repertoire.ts
      gallery.ts
    lib/
      metadata.ts
    components/
      OrnamentDivider.tsx
      SectionHeading.tsx
      Header.tsx
      Footer.tsx
      LanguageSwitcher.tsx
      MobileNav.tsx
      NewsCard.tsx
      EventCard.tsx
      PlaceholderArt.tsx
    app/
      globals.css
      page.tsx                         (root redirect to /sr)
      sitemap.ts
      robots.ts
      [locale]/
        layout.tsx
        page.tsx                       (home)
        o-nama/page.tsx
        sekcije/page.tsx
        repertoar/page.tsx
        vesti/page.tsx
        vesti/[slug]/page.tsx
        dogadjaji/page.tsx
        galerija/page.tsx
        kontakt/page.tsx
  public/
    images/
      README.md                        (where to drop real photos)
```

---

### Task 1: Project scaffold — Next.js, TypeScript, Tailwind, static export

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx` (temporary placeholder, replaced in Task 4/6 wiring)
- Create: `.gitignore`

**Interfaces:**
- Produces: working `npm run dev`, `npm run build` (static export to `out/`) commands available to every later task.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "kud-sumadija",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "npx serve out",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.6",
    "next-intl": "3.26.3",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.0.0",
    "@types/node": "22.10.7",
    "@types/react": "19.0.7",
    "@types/react-dom": "19.0.3",
    "tailwindcss": "4.0.0",
    "typescript": "5.7.3"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, no error output.

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `next.config.ts`**

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Create `postcss.config.mjs`**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 6: Create `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-cream: #faf6ef;
  --color-bordo: #7a1f2b;
  --color-bordo-dark: #5e1620;
  --color-gold: #c9a24b;
  --color-navy: #1f2a3c;
  --font-heading: "Georgia", "Times New Roman", serif;
  --font-body: system-ui, -apple-system, "Segoe UI", sans-serif;
}

body {
  background-color: var(--color-cream);
  color: var(--color-navy);
  font-family: var(--font-body);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}
```

- [ ] **Step 7: Create temporary `src/app/page.tsx`**

```tsx
export default function TempRoot() {
  return <div>scaffold ok</div>;
}
```

- [ ] **Step 8: Create `.gitignore`**

```
node_modules
.next
out
.env*.local
*.tsbuildinfo
next-env.d.ts
.DS_Store
```

- [ ] **Step 9: Verify build**

Run: `npm run build`
Expected: build succeeds, `out/index.html` exists and contains `scaffold ok`.

Run: `grep -o "scaffold ok" out/index.html`
Expected: prints `scaffold ok`

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs src/app/globals.css src/app/page.tsx .gitignore
git commit -m "chore: scaffold Next.js static-export project with Tailwind"
```

---

### Task 2: i18n infrastructure (next-intl, always-prefixed locales, root redirect)

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Create: `messages/sr.json`
- Create: `messages/en.json`
- Modify: `src/app/page.tsx` (root redirect instead of temp placeholder)
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (temporary, replaced fully in Task 6)

**Interfaces:**
- Produces: `routing` object (`locales: ['sr','en']`, `defaultLocale: 'sr'`), `Link`, `redirect`, `usePathname`, `useRouter` from `src/i18n/navigation.ts` — every later page/component imports navigation helpers from here, never from `next/link` or `next/navigation` directly, and translation strings via `useTranslations`/`getTranslations` from `next-intl`.

- [ ] **Step 1: Create `src/i18n/routing.ts`**

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
```

- [ ] **Step 2: Create `src/i18n/navigation.ts`**

```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 3: Create `src/i18n/request.ts`**

```typescript
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create `messages/sr.json`**

```json
{
  "nav": {
    "home": "Почетна",
    "about": "О нама",
    "sections": "Секције",
    "repertoire": "Репертоар",
    "news": "Вести",
    "events": "Догађаји",
    "gallery": "Галерија",
    "contact": "Контакт"
  },
  "common": {
    "readMore": "Прочитај више",
    "learnMore": "Сазнај више",
    "back": "Назад"
  },
  "footer": {
    "address": "Адреса проба: Дом културе, Крагујевац",
    "rights": "Сва права задржана."
  }
}
```

- [ ] **Step 5: Create `messages/en.json`**

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "sections": "Sections",
    "repertoire": "Repertoire",
    "news": "News",
    "events": "Events",
    "gallery": "Gallery",
    "contact": "Contact"
  },
  "common": {
    "readMore": "Read more",
    "learnMore": "Learn more",
    "back": "Back"
  },
  "footer": {
    "address": "Rehearsal address: House of Culture, Kragujevac",
    "rights": "All rights reserved."
  }
}
```

- [ ] **Step 6: Replace `src/app/page.tsx` with root redirect**

```tsx
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
```

- [ ] **Step 7: Create `src/app/[locale]/layout.tsx`**

> **Note:** `src/app/layout.tsx` (the true App Router root layout, created in Task 1
> because `src/app/page.tsx` lives outside the `[locale]` segment and Next.js
> requires exactly one root layout with `<html>`/`<body>`) already owns those
> tags. This nested layout must NOT redeclare `<html>`/`<body>` — doing so
> produces invalid nested HTML. It only wraps children in the i18n provider.

```tsx
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "КУД Шумадија Влашка",
  description: "Културно-уметничко друштво Шумадија Влашка",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
```

- [ ] **Step 8: Create temporary `src/app/[locale]/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  return <div>{t("home")}</div>;
}
```

- [ ] **Step 9: Verify build and locale routing**

Run: `npm run build`
Expected: build succeeds, `out/sr/index.html` and `out/en/index.html` both exist.

Run: `grep -o "Почетна" out/sr/index.html`
Expected: prints `Почетна`

Run: `grep -o "Home" out/en/index.html`
Expected: prints `Home`

Run: `grep -o "NEXT_REDIRECT;replace;/sr" out/index.html`
Expected: a match (confirms the App Router embedded a client-side redirect digest from `/` to `/sr`; on this Next.js version the client runtime processes this digest via `router.replace()` during hydration rather than an inlined `window.location.replace` string)

- [ ] **Step 10: Commit**

```bash
git add src/i18n messages src/app/page.tsx src/app/[locale]/layout.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: add sr/en i18n routing with next-intl static export"
```

---

### Task 3: Design primitives — ornament divider, section heading, placeholder art

**Files:**
- Create: `src/components/OrnamentDivider.tsx`
- Create: `src/components/SectionHeading.tsx`
- Create: `src/components/PlaceholderArt.tsx`

**Interfaces:**
- Produces: `<OrnamentDivider />` (no props), `<SectionHeading eyebrow? title subtitle? />`, `<PlaceholderArt seed label className? />` — used by every page task below.

- [ ] **Step 1: Create `src/components/OrnamentDivider.tsx`**

```tsx
export function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6" aria-hidden="true">
      <span className="h-px w-16 bg-[var(--color-gold)]" />
      <svg width="28" height="28" viewBox="0 0 28 28" className="text-[var(--color-gold)]">
        <path
          d="M14 2 L18 10 L26 14 L18 18 L14 26 L10 18 L2 14 L10 10 Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-16 bg-[var(--color-gold)]" />
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/SectionHeading.tsx`**

```tsx
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      {eyebrow && (
        <p className="uppercase tracking-widest text-sm text-[var(--color-bordo)] font-semibold mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--color-navy)]/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/PlaceholderArt.tsx`**

Deterministic SVG placeholder (no external images needed) using a seeded hue so different cards look distinct but consistent across sr/en builds.

```tsx
function hueFromSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  return hash;
}

export function PlaceholderArt({
  seed,
  label,
  className,
}: {
  seed: string;
  label: string;
  className?: string;
}) {
  const hue = hueFromSeed(seed);
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 88%), hsl(${(hue + 40) % 360} 40% 78%))`,
      }}
      role="img"
      aria-label={label}
    >
      <svg width="64" height="64" viewBox="0 0 28 28" className="text-white/70">
        <path
          d="M14 2 L18 10 L26 14 L18 18 L14 26 L10 18 L2 14 L10 10 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds (components aren't imported anywhere yet, but must compile without TypeScript errors — run `npx tsc --noEmit` too).

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/OrnamentDivider.tsx src/components/SectionHeading.tsx src/components/PlaceholderArt.tsx
git commit -m "feat: add ornament divider, section heading, and placeholder art primitives"
```

---

### Task 4: Content data modules (news, events, sections, repertoire, gallery)

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/news.ts`
- Create: `src/content/events.ts`
- Create: `src/content/sections.ts`
- Create: `src/content/repertoire.ts`
- Create: `src/content/gallery.ts`

**Interfaces:**
- Produces: `NewsItem`, `EventItem`, `SectionItem`, `RepertoireRegion`, `GalleryItem` types, and arrays `newsItems`, `eventItems`, `sectionItems`, `repertoireRegions`, `galleryItems`. Every field that is user-facing text is `{ sr: string; en: string }` — pages pick the right one via the active `locale` param.

- [ ] **Step 1: Create `src/content/types.ts`**

```typescript
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
};
```

- [ ] **Step 2: Create `src/content/news.ts`**

```typescript
import type { NewsItem } from "./types";

export const newsItems: NewsItem[] = [
  {
    slug: "godisnji-koncert-2026",
    date: "2026-05-10",
    title: {
      sr: "Годишњи концерт КУД Шумадија Влашка одржан пред пуном салом",
      en: "KUD Šumadija Vlaška's annual concert held before a full house",
    },
    excerpt: {
      sr: "Наше секције су представиле кореографије из свих крајева Србије.",
      en: "Our sections performed choreographies from every region of Serbia.",
    },
    body: {
      sr: "Годишњи концерт друштва одржан је у Дому културе уз учешће свих узрасних секција. Публика је уживала у играма из Шумадије, Војводине и јужне Србије, као и у ревији народних ношњи.",
      en: "The society's annual concert was held at the House of Culture with all age sections performing. The audience enjoyed dances from Šumadija, Vojvodina, and southern Serbia, along with a folk costume showcase.",
    },
  },
  {
    slug: "nova-decja-sekcija",
    date: "2026-03-02",
    title: {
      sr: "Отворена нова дечја секција",
      en: "New children's section opened",
    },
    excerpt: {
      sr: "Позивамо децу узраста 6-10 година да нам се придруже на пробама.",
      en: "We invite children aged 6-10 to join us at rehearsals.",
    },
    body: {
      sr: "Због великог интересовања, отворили смо нову групу за најмлађе. Пробе се одржавају два пута недељно у Дому културе.",
      en: "Due to high interest, we've opened a new group for the youngest members. Rehearsals are held twice a week at the House of Culture.",
    },
  },
];
```

- [ ] **Step 3: Create `src/content/events.ts`**

```typescript
import type { EventItem } from "./types";

export const eventItems: EventItem[] = [
  {
    id: "festival-sabora-2026",
    date: "2026-06-20",
    title: {
      sr: "Међународни фестивал фолклора",
      en: "International Folklore Festival",
    },
    location: {
      sr: "Крагујевац, Градски трг",
      en: "Kragujevac, City Square",
    },
    description: {
      sr: "Наше друштво наступа као домаћин фестивала са ансамблима из региона.",
      en: "Our society performs as host of the festival alongside regional ensembles.",
    },
  },
  {
    id: "gostovanje-nis",
    date: "2026-09-05",
    title: {
      sr: "Гостовање у Нишу",
      en: "Guest performance in Niš",
    },
    location: {
      sr: "Ниш, Дом омладине",
      en: "Niš, Youth Center",
    },
    description: {
      sr: "Наступ поводом Дана града Ниша у сарадњи са локалним КУД-ом.",
      en: "Performance for Niš City Day in cooperation with the local folklore society.",
    },
  },
];
```

- [ ] **Step 4: Create `src/content/sections.ts`**

```typescript
import type { SectionItem } from "./types";

export const sectionItems: SectionItem[] = [
  {
    id: "decja",
    name: { sr: "Дечја секција", en: "Children's Section" },
    ageRange: { sr: "6–10 година", en: "6–10 years" },
    description: {
      sr: "Први кораци у народном игру кроз игру и дружење.",
      en: "First steps into folk dance through play and friendship.",
    },
  },
  {
    id: "omladinska",
    name: { sr: "Омладинска секција", en: "Youth Section" },
    ageRange: { sr: "11–17 година", en: "11–17 years" },
    description: {
      sr: "Озбиљнији рад на техници игре и припрема за наступе.",
      en: "More serious work on dance technique and performance preparation.",
    },
  },
  {
    id: "senior",
    name: { sr: "Сениорска секција", en: "Senior Section" },
    ageRange: { sr: "18+ година", en: "18+ years" },
    description: {
      sr: "Најискуснији играчи, носиоци репертоара друштва.",
      en: "Our most experienced dancers, carrying the society's repertoire.",
    },
  },
];
```

- [ ] **Step 5: Create `src/content/repertoire.ts`**

```typescript
import type { RepertoireRegion } from "./types";

export const repertoireRegions: RepertoireRegion[] = [
  {
    id: "sumadija",
    region: { sr: "Шумадија", en: "Šumadija" },
    dances: [
      { sr: "Ужичко коло", en: "Užičko kolo" },
      { sr: "Шумадијска свита", en: "Šumadija Suite" },
    ],
    costumeNote: {
      sr: "Ношња карактеришу тамна боја сукна и опанци са virnovima.",
      en: "The costume features dark wool cloth and traditional opanci footwear.",
    },
  },
  {
    id: "vojvodina",
    region: { sr: "Војводина", en: "Vojvodina" },
    dances: [
      { sr: "Војвођанско коло", en: "Vojvođansko kolo" },
      { sr: "Потиска свита", en: "Potiska Suite" },
    ],
    costumeNote: {
      sr: "Богато украшене кошуље и сукње са везом карактеристичним за Панонску низију.",
      en: "Richly decorated shirts and skirts with embroidery typical of the Pannonian Plain.",
    },
  },
  {
    id: "juzna-srbija",
    region: { sr: "Јужна Србија", en: "Southern Serbia" },
    dances: [
      { sr: "Врањанка", en: "Vranjanka" },
      { sr: "Прешевска свита", en: "Preševo Suite" },
    ],
    costumeNote: {
      sr: "Живе боје и орнаменти под утицајем оријенталне традиције.",
      en: "Vivid colors and ornaments influenced by oriental tradition.",
    },
  },
];
```

- [ ] **Step 6: Create `src/content/gallery.ts`**

```typescript
import type { GalleryItem } from "./types";

export const galleryItems: GalleryItem[] = [
  { id: "g1", category: { sr: "Наступи", en: "Performances" }, caption: { sr: "Годишњи концерт 2026", en: "Annual concert 2026" } },
  { id: "g2", category: { sr: "Наступи", en: "Performances" }, caption: { sr: "Фестивал фолклора", en: "Folklore festival" } },
  { id: "g3", category: { sr: "Пробе", en: "Rehearsals" }, caption: { sr: "Дечја секција на проби", en: "Children's section rehearsing" } },
  { id: "g4", category: { sr: "Ношње", en: "Costumes" }, caption: { sr: "Шумадијска ношња", en: "Šumadija costume" } },
  { id: "g5", category: { sr: "Ношње", en: "Costumes" }, caption: { sr: "Војвођанска ношња", en: "Vojvodina costume" } },
  { id: "g6", category: { sr: "Пробе", en: "Rehearsals" }, caption: { sr: "Сениорска секција", en: "Senior section" } },
];
```

- [ ] **Step 7: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 8: Commit**

```bash
git add src/content
git commit -m "feat: add static bilingual content data for news, events, sections, repertoire, gallery"
```

---

### Task 5: Header, Footer, LanguageSwitcher, MobileNav

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`
- Create: `src/components/MobileNav.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/[locale]/layout.tsx:1-40` (wrap children in Header/Footer)

**Interfaces:**
- Consumes: `Link`, `usePathname`, `routing` from `src/i18n/navigation.ts` / `src/i18n/routing.ts` (Task 2); `useTranslations` from `next-intl`.
- Produces: `<Header />`, `<Footer />` (no props) rendered by the locale layout for every page.

- [ ] **Step 1: Create `src/components/LanguageSwitcher.tsx`**

```tsx
"use client";

import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import NextLink from "next/link";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      {routing.locales.map((locale) => (
        <NextLink
          key={locale}
          href={`/${locale}${pathname === "/" ? "" : pathname}`}
          className={
            locale === activeLocale
              ? "text-[var(--color-bordo)] underline underline-offset-4"
              : "text-[var(--color-navy)]/60 hover:text-[var(--color-bordo)]"
          }
        >
          {locale.toUpperCase()}
        </NextLink>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/MobileNav.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const links = [
  { href: "/", key: "home" },
  { href: "/o-nama", key: "about" },
  { href: "/sekcije", key: "sections" },
  { href: "/repertoar", key: "repertoire" },
  { href: "/vesti", key: "news" },
  { href: "/dogadjaji", key: "events" },
  { href: "/galerija", key: "gallery" },
  { href: "/kontakt", key: "contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        aria-expanded={open}
        className="p-2 text-[var(--color-navy)]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-full bg-[var(--color-cream)] border-t border-[var(--color-gold)]/40 shadow-lg">
          <ul className="flex flex-col p-4 gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 text-[var(--color-navy)] font-medium"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/Header.tsx`**

```tsx
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

const links = [
  { href: "/", key: "home" },
  { href: "/o-nama", key: "about" },
  { href: "/sekcije", key: "sections" },
  { href: "/repertoar", key: "repertoire" },
  { href: "/vesti", key: "news" },
  { href: "/dogadjaji", key: "events" },
  { href: "/galerija", key: "gallery" },
  { href: "/kontakt", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="relative border-b border-[var(--color-gold)]/40 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-[var(--color-bordo)]">
          КУД Шумадија Влашка
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--color-bordo)]">
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Create `src/components/Footer.tsx`**

```tsx
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[var(--color-gold)]/40 bg-[var(--color-navy)] text-[var(--color-cream)] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row md:justify-between gap-4">
        <p>КУД Шумадија Влашка</p>
        <p>{t("address")}</p>
        <p>&copy; {new Date().getFullYear()} КУД Шумадија Влашка. {t("rights")}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Modify `src/app/[locale]/layout.tsx` to render Header/Footer**

Replace the `return` statement's `<NextIntlClientProvider>` block:

```tsx
  return (
    <NextIntlClientProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
```

Add imports at top of the file:

```tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -o "КУД Шумадија Влашка" out/sr/index.html | head -1`
Expected: prints `КУД Шумадија Влашка`

Run: `grep -o "Sections" out/en/o-nama/index.html 2>/dev/null; echo done`
Expected: prints `done` (page doesn't exist yet — this just confirms the command completes; real nav check below)

Run: `grep -o "Home" out/en/index.html`
Expected: prints `Home` (nav link text)

- [ ] **Step 7: Commit**

```bash
git add src/components/LanguageSwitcher.tsx src/components/MobileNav.tsx src/components/Header.tsx src/components/Footer.tsx "src/app/[locale]/layout.tsx"
git commit -m "feat: add header, footer, language switcher, and mobile nav"
```

---

### Task 6: Homepage

**Files:**
- Modify: `src/app/[locale]/page.tsx` (replace temporary content from Task 2)

**Interfaces:**
- Consumes: `SectionHeading`, `OrnamentDivider`, `PlaceholderArt` (Task 3); `newsItems` (Task 4); `Link` (Task 2).

- [ ] **Step 1: Replace `src/app/[locale]/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -o "Културно-уметничко друштво Шумадија Влашка" out/sr/index.html`
Expected: prints the heading text.

Run: `grep -o "Šumadija Vlaška Cultural and Artistic Society" out/en/index.html`
Expected: prints the heading text.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/page.tsx"
git commit -m "feat: build homepage with hero, about teaser, and latest news"
```

---

### Task 7: O nama and Sekcije pages

**Files:**
- Create: `src/app/[locale]/o-nama/page.tsx`
- Create: `src/app/[locale]/sekcije/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `OrnamentDivider`, `PlaceholderArt` (Task 3); `sectionItems` (Task 4).

- [ ] **Step 1: Create `src/app/[locale]/o-nama/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `src/app/[locale]/sekcije/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { sectionItems } from "@/content/sections";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "Секције | КУД Шумадија Влашка" : "Sections | KUD Šumadija Vlaška",
  };
}

export default async function SectionsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow={isSr ? "Секције" : "Sections"}
        title={isSr ? "Наши ансамбли" : "Our ensembles"}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sectionItems.map((section) => (
          <div key={section.id} className="rounded-lg overflow-hidden border border-[var(--color-gold)]/30">
            <PlaceholderArt seed={section.id} label={section.name[locale]} className="h-40 w-full" />
            <div className="p-5">
              <h3 className="font-bold text-lg">{section.name[locale]}</h3>
              <p className="text-sm text-[var(--color-bordo)] font-semibold mb-2">{section.ageRange[locale]}</p>
              <p className="text-sm text-[var(--color-navy)]/70">{section.description[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -o "Наша историја" out/sr/o-nama/index.html`
Expected: prints `Наша историја`

Run: `grep -o "Our ensembles" out/en/sekcije/index.html`
Expected: prints `Our ensembles`

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/o-nama" "src/app/[locale]/sekcije"
git commit -m "feat: add about and sections pages"
```

---

### Task 8: Repertoar page

**Files:**
- Create: `src/app/[locale]/repertoar/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PlaceholderArt` (Task 3); `repertoireRegions` (Task 4).

- [ ] **Step 1: Create `src/app/[locale]/repertoar/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { repertoireRegions } from "@/content/repertoire";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "Репертоар | КУД Шумадија Влашка" : "Repertoire | KUD Šumadija Vlaška",
  };
}

export default async function RepertoirePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow={isSr ? "Репертоар" : "Repertoire"}
        title={isSr ? "Игре и ношње по крајевима" : "Dances and costumes by region"}
      />
      <div className="space-y-12">
        {repertoireRegions.map((region) => (
          <div key={region.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <PlaceholderArt seed={region.id} label={region.region[locale]} className="h-56 w-full rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-bordo)] mb-2">{region.region[locale]}</h3>
              <ul className="list-disc list-inside mb-3 text-[var(--color-navy)]/90">
                {region.dances.map((dance) => (
                  <li key={dance[locale]}>{dance[locale]}</li>
                ))}
              </ul>
              <p className="text-sm text-[var(--color-navy)]/70">{region.costumeNote[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -o "Ужичко коло" out/sr/repertoar/index.html`
Expected: prints `Ужичко коло`

Run: `grep -o "Vranjanka" out/en/repertoar/index.html`
Expected: prints `Vranjanka`

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/repertoar"
git commit -m "feat: add repertoire page grouped by region"
```

---

### Task 9: Vesti list and detail pages

**Files:**
- Create: `src/app/[locale]/vesti/page.tsx`
- Create: `src/app/[locale]/vesti/[slug]/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PlaceholderArt`, `newsItems` (Tasks 3–4); `Link` (Task 2).
- Produces: `generateStaticParams` pattern for a nested dynamic content route — reused conceptually by no later task, but this is the only dynamic-slug route in the app so it must fully resolve at build time (required for static export).

- [ ] **Step 1: Create `src/app/[locale]/vesti/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { Link } from "@/i18n/navigation";
import { newsItems } from "@/content/news";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "Вести | КУД Шумадија Влашка" : "News | KUD Šumadija Vlaška",
  };
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
```

- [ ] **Step 2: Create `src/app/[locale]/vesti/[slug]/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { newsItems } from "@/content/news";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    newsItems.map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title[locale]} | КУД Шумадија Влашка`,
    description: item.excerpt[locale],
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = newsItems.find((n) => n.slug === slug);
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
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds, `out/sr/vesti/godisnji-koncert-2026/index.html` exists.

Run: `grep -o "Годишњи концерт КУД Шумадија Влашка одржан пред пуном салом" out/sr/vesti/godisnji-koncert-2026/index.html`
Expected: prints the title.

Run: `grep -o "annual concert held before a full house" out/en/vesti/godisnji-koncert-2026/index.html`
Expected: prints matching English text.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/vesti"
git commit -m "feat: add news list and detail pages with static params for all slugs"
```

---

### Task 10: Dogadjaji and Galerija pages

**Files:**
- Create: `src/app/[locale]/dogadjaji/page.tsx`
- Create: `src/app/[locale]/galerija/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `PlaceholderArt` (Task 3); `eventItems`, `galleryItems` (Task 4).

- [ ] **Step 1: Create `src/app/[locale]/dogadjaji/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { eventItems } from "@/content/events";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "Догађаји | КУД Шумадија Влашка" : "Events | KUD Šumadija Vlaška",
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";
  const sorted = [...eventItems].sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading eyebrow={isSr ? "Догађаји" : "Events"} title={isSr ? "Предстојећи наступи" : "Upcoming performances"} />
      <div className="space-y-6">
        {sorted.map((event) => (
          <div key={event.id} className="flex gap-5 border-l-4 border-[var(--color-gold)] pl-5 py-2">
            <div className="min-w-[90px] font-bold text-[var(--color-bordo)]">{event.date}</div>
            <div>
              <h3 className="font-bold text-lg">{event.title[locale]}</h3>
              <p className="text-sm text-[var(--color-navy)]/60">{event.location[locale]}</p>
              <p className="text-sm text-[var(--color-navy)]/80 mt-1">{event.description[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/[locale]/galerija/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -o "Upcoming performances" out/en/dogadjaji/index.html`
Expected: prints `Upcoming performances`

Run: `grep -o "Фотографије и тренуци" out/sr/galerija/index.html`
Expected: prints `Фотографије и тренуци`

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/dogadjaji" "src/app/[locale]/galerija"
git commit -m "feat: add events and gallery pages"
```

---

### Task 11: Kontakt page

**Files:**
- Create: `src/app/[locale]/kontakt/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 3).
- No contact form backend exists (static export constraint) — form posts via `mailto:` link, not a submitted `<form>`, so no server/API is required.

- [ ] **Step 1: Create `src/app/[locale]/kontakt/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sr" ? "Контакт | КУД Шумадија Влашка" : "Contact | KUD Šumadija Vlaška",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isSr = locale === "sr";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading eyebrow={isSr ? "Контакт" : "Contact"} title={isSr ? "Пронађите нас" : "Find us"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3 text-[var(--color-navy)]/90">
          <p>
            <strong>{isSr ? "Адреса проба:" : "Rehearsal address:"}</strong><br />
            {isSr ? "Дом културе, Крагујевац" : "House of Culture, Kragujevac"}
          </p>
          <p>
            <strong>Email:</strong><br />
            <a href="mailto:info@kud-sumadija.rs" className="text-[var(--color-bordo)] hover:underline">
              info@kud-sumadija.rs
            </a>
          </p>
          <p>
            <strong>{isSr ? "Телефон:" : "Phone:"}</strong><br />
            +381 34 000 000
          </p>
          <a
            href="mailto:info@kud-sumadija.rs?subject=Upit sa sajta"
            className="inline-block mt-4 rounded-full bg-[var(--color-bordo)] text-[var(--color-cream)] font-semibold px-6 py-3 hover:opacity-90"
          >
            {isSr ? "Пошаљи нам поруку" : "Send us a message"}
          </a>
        </div>
        <iframe
          title={isSr ? "Мапа лоакције проба" : "Rehearsal location map"}
          className="w-full h-64 md:h-full rounded-lg border-0"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=20.90%2C44.00%2C20.95%2C44.03&layer=mapnik"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -o "Find us" out/en/kontakt/index.html`
Expected: prints `Find us`

Run: `grep -o "info@kud-sumadija.rs" out/sr/kontakt/index.html`
Expected: prints the email address.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/kontakt"
git commit -m "feat: add contact page with mailto CTA and embedded map"
```

---

### Task 12: SEO — sitemap, robots, root metadata

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/[locale]/layout.tsx` (add per-locale metadata with hreflang alternates)

**Interfaces:**
- Consumes: `routing.locales` (Task 2); all page route paths defined across Tasks 6–11.

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { newsItems } from "@/content/news";

const SITE_URL = "https://kud-sumadija.rs";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

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
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://kud-sumadija.rs/sitemap.xml",
  };
}
```

- [ ] **Step 3: Modify `src/app/[locale]/layout.tsx` — replace the static `metadata` export with `generateMetadata` for hreflang alternates**

Replace:

```tsx
export const metadata: Metadata = {
  title: "КУД Шумадија Влашка",
  description: "Културно-уметничко друштво Шумадија Влашка",
};
```

With:

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL("https://kud-sumadija.rs"),
    title: {
      default: "КУД Шумадија Влашка",
      template: "%s",
    },
    description:
      locale === "sr"
        ? "Културно-уметничко друштво Шумадија Влашка"
        : "KUD Šumadija Vlaška Cultural and Artistic Society",
    alternates: {
      languages: {
        sr: "/sr",
        en: "/en",
      },
    },
  };
}
```

> **Note:** `metadataBase` is required for Next.js to resolve the relative
> `alternates.languages` paths (`/sr`, `/en`) into absolute URLs in the
> rendered `<link rel="alternate" hreflang="...">` tags. Without it, Next.js
> emits relative hrefs, which most search engines ignore per the hreflang
> spec — silently defeating this task's SEO purpose.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds, `out/sitemap.xml` and `out/robots.txt` exist.

Run: `grep -o "kud-sumadija.rs/sr/vesti/godisnji-koncert-2026" out/sitemap.xml`
Expected: prints the matching URL.

Run: `cat out/robots.txt`
Expected: contains `Sitemap: https://kud-sumadija.rs/sitemap.xml`

Run: `grep -o '<link rel="alternate" hrefLang="sr" href="[^"]*"' out/sr/index.html`
Expected: the `href` value is an absolute URL (`https://kud-sumadija.rs/sr`), not a relative path (`/sr`) — confirms `metadataBase` correctly resolved the hreflang links.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts "src/app/[locale]/layout.tsx"
git commit -m "feat: add sitemap, robots.txt, and hreflang metadata"
```

---

### Task 13: README, image asset placeholder folder, deployment verification

**Files:**
- Create: `public/images/README.md`
- Create: `README.md`

**Interfaces:**
- None — this task documents the finished project, it does not introduce new code interfaces.

- [ ] **Step 1: Create `public/images/README.md`**

```markdown
# Slike

Sajt trenutno koristi generisane SVG placeholder-e (vidi
`src/components/PlaceholderArt.tsx`) umesto pravih fotografija, jer prave
fotografije društva još nisu dostavljene.

Kada budu dostupne, ubaci ih ovde (npr. `hero.jpg`, `news-1.jpg`,
`gallery-1.jpg`) i zameni pozive `<PlaceholderArt />` sa `<img>` ili
`next/image` (uz `unoptimized` jer je sajt statički export).
```

- [ ] **Step 2: Create `README.md`**

```markdown
# KUD Šumadija Vlaška — sajt

Statički, dvojezičan (српски ћирилицом / engleski) sajt za Kulturno-umetničko
društvo Šumadija, napravljen u Next.js-u.

## Razvoj

```bash
npm install
npm run dev
```

Otvori http://localhost:3000 — automatski se preusmerava na `/sr`.

## Build (static export)

```bash
npm run build
```

Statički fajlovi se generišu u `out/`.

## Deploy na Vercel

1. Push-uj repo na GitHub.
2. Importuj repo na https://vercel.com/new.
3. Vercel automatski prepoznaje Next.js — nema potrebe za dodatnim
   podešavanjima (`output: 'export'` je već u `next.config.ts`).
4. Klikni Deploy.

## Deploy na bilo koji static hosting

Upload-uj sadržaj `out/` foldera nakon `npm run build`.

## Struktura sadržaja

Sav tekstualni sadržaj (vesti, događaji, sekcije, repertoar, galerija) nalazi
se u `src/content/*.ts` kao tipizirani JS objekti sa `{ sr, en }` poljima.
Izmena sadržaja = izmena tih fajlova + commit, bez CMS-a i baze.

Prave fotografije treba dodati u `public/images/` — vidi
`public/images/README.md`.
```

- [ ] **Step 3: Final full verification**

Run: `npm run build`
Expected: build succeeds with no errors or warnings about missing routes.

Run: `find out -name "index.html" | wc -l`
Expected: a number >= 20 (8 pages + root + 2 news detail pages, times 2 locales, plus root redirect)

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add README.md public/images/README.md
git commit -m "docs: add README with dev/build/deploy instructions"
```

---

## Self-Review Notes

- **Spec coverage:** All 8 spec pages (Task 6–11), i18n sr/en (Task 2), static content model (Task 4), design/ornament identity (Task 3, 6), SEO sitemap/robots/hreflang (Task 12), Vercel-ready static export (Task 1, 13) — all covered. Contact form is `mailto:`-based per spec's "van scope" note that there's no backend.
- **Placeholder scan:** No TBD/TODO in any step; all code blocks are complete and runnable. Image assets are explicitly out of scope for real photography (documented, not stubbed as "add images later" code).
- **Type consistency:** `AppLocale` (from `src/i18n/routing.ts`, Task 2) is used consistently as the `params.locale` type across Tasks 6–12. `Localized` type (Task 4) fields (`sr`/`en`) match how every page indexes `item.title[locale]`. Component prop names (`seed`, `label`, `className` for `PlaceholderArt`; `eyebrow`, `title`, `subtitle` for `SectionHeading`) are identical between their Task 3 definition and every call site in Tasks 6–11.
