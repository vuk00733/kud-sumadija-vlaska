# KUD Šumadija Vlaška — sajt

Statički, dvojezičan (српски ћирилицом / engleski) sajt za Kulturno-umetničko
društvo Šumadija Vlaška, napravljen u Next.js-u.

## Razvoj

```bash
npm install
npm run dev
```

Otvori http://localhost:3000 — automatski se preusmerava na `/sr`.

Sajt čita vesti/događaje/galeriju iz Sanity CMS-a u trenutku build-a, pa za
lokalni razvoj treba `.env.local` sa:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=u2wdtbu2
NEXT_PUBLIC_SANITY_DATASET=production
```

(već postoji u repo-u kao `.env.local`, `.env.example` je referenca).

## Build (static export)

```bash
npm run build
```

Statički fajlovi se generišu u `out/`.

## Deploy na Vercel

1. Push-uj repo na GitHub.
2. Importuj repo na https://vercel.com/new.
3. Vercel automatski prepoznaje Next.js — nema potrebe za dodatnim
   podešavanjima (`output: 'export'` je već u `next.config.ts`), **ali**
   moraš dodati Environment Variables u Vercel projektu (Settings →
   Environment Variables):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=u2wdtbu2
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Klikni Deploy.

## Deploy na bilo koji static hosting

Upload-uj sadržaj `out/` foldera nakon `npm run build`.

## CMS za vesti, događaje i galeriju (Sanity)

Vesti, događaji i galerija se ne uređuju kroz kod — admin ih unosi kroz
Sanity Studio, javno dostupan na:

**https://kud-sumadija-vlaska.sanity.studio/**

Admin se loguje svojim Google/email nalogom (prvi put treba da ga neko sa
pristupom projektu pozove kroz sanity.io/manage → projekat → Members).

### Kako izmene stižu na sajt

Sajt je i dalje potpuno statičan — Sanity podaci se povlače **u trenutku
build-a**, ne uživo. To znači da posle izmene u Studio-u treba da se sajt
ponovo build-uje da bi se izmena videla. Da to bude automatsko:

1. U Vercel projektu: Settings → Git → Deploy Hooks → napravi novi hook
   (npr. "Sanity rebuild"), kopiraj URL.
2. U Sanity: https://www.sanity.io/manage → projekat → API → Webhooks →
   Add webhook. URL = Vercel deploy hook URL, Dataset = `production`,
   Trigger on = Create/Update/Delete. Sačuvaj.

Posle ovoga, svaka izmena u Studio-u (objavljena vest, novi događaj, nova
slika u galeriji) automatski pokreće novi Vercel deploy za ~30-60 sekundi.

### Šeme sadržaja

Definisane u `studio/schemaTypes/`:
- `newsPost.ts` — vesti (naslov/opis/tekst na oba jezika, slug, datum)
- `event.ts` — događaji (naslov/lokacija/opis na oba jezika, datum)
- `galleryItem.ts` — slika + kategorija/opis na oba jezika + redosled

### Lokalni rad na Studio-u

```bash
cd studio
npm install
npm run dev
```

Posle izmene šeme, redeploy Studio-a: `cd studio && npx sanity deploy`.

## Struktura sadržaja

Sekcije, Repertoar i tekst o društvu i dalje su statični, u
`src/content/*.ts` kao tipizirani JS objekti sa `{ sr, en }` poljima —
izmena = izmena fajla + commit, bez CMS-a. Vesti/događaji/galerija dolaze
iz Sanity-ja (`src/lib/sanity.ts`).

Prave fotografije za sekcije/repertoar treba dodati u `public/images/` —
vidi `public/images/README.md`. Fotografije za galeriju se dodaju direktno
kroz Sanity Studio (upload slike uz svaki galleryItem).

## Pre lansiranja (before launch)

- Zameniti placeholder broj telefona i email adresu na strani za kontakt
  (`src/app/[locale]/kontakt/page.tsx`) stvarnim podacima društva.
- Zameniti SVG placeholder ilustracije (sekcije/repertoar) stvarnim
  fotografijama — vidi `public/images/README.md`.
- Podesiti Vercel Deploy Hook + Sanity webhook (vidi sekciju "CMS" iznad) da
  se sajt automatski osvežava kad admin objavi izmenu.
- Dodati env promenljive (`NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`) u Vercel projekat.
- Pozvati admine (npr. osobu koja vodi vesti/događaje) kao člana Sanity
  projekta: sanity.io/manage → projekat → Members → Invite.
- Proveriti da su datumi događaja u Sanity Studio-u i dalje tačni, i uneti
  prave fotografije u galeriju kroz Studio.
