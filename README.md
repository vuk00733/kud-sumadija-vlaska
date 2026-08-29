# KUD Šumadija Vlaška — sajt

Statički, dvojezičan (српски ћирилицом / engleski) sajt za Kulturno-umetničko
društvo Šumadija Vlaška, napravljen u Next.js-u.

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

## Pre lansiranja (before launch)

- Zameniti placeholder broj telefona i email adresu na strani za kontakt
  (`src/app/[locale]/kontakt/page.tsx`) stvarnim podacima društva.
- Zameniti SVG placeholder ilustracije stvarnim fotografijama — vidi
  `public/images/README.md`.
- Proveriti da su datumi događaja (`src/content/events.ts`) i dalje tačni.
