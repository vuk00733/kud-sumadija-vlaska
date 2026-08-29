# KUD Šumadija Vlaška — sajt: dizajn

## Cilj

Statički, moderan, mobile-first sajt za Kulturno-umetničko društvo Šumadija Vlaška,
tematski inspirisan narodnom kulturom, dvojezičan (српски/ћирилица default,
енглески switch), lak za deploy na Vercel.

## Stack

- **Next.js 15** (App Router), TypeScript, static export (`output: 'export'`)
- **Tailwind CSS** za stilizovanje
- **next-intl** za i18n, rute `/sr` (default, ćirilica) i `/en`
- Sadržaj: statični Markdown/JSON fajlovi u repou (bez CMS-a, bez baze)
- Slike: `/public`, optimizovane (next/image radi samo delimično sa static
  export — koristimo unoptimized mod ili pre-optimizovane slike)
- Deploy: Vercel (zero-config), ili bilo koji static host preko `out/` foldera

## Struktura sajta

Rute (za oba jezika, prefiks `/sr` i `/en`):

1. `/` — Početna: hero sekcija, kratko o društvu, istaknute vesti, poziv na
   akciju (probe/kontakt)
2. `/o-nama` — О друштву: istorija, misija, uprava
3. `/sekcije` — Секције/Ансамбли: pregled sekcija (deca, omladina, senior...)
4. `/repertoar` — Репертоар: igre po krajevima Srbije + narodne nošnje,
   galerija po regionu
5. `/vesti` — Вести: lista + `/vesti/[slug]` pojedinačni članak
6. `/dogadjaji` — Догађаји: kalendar/lista predstojećih nastupa
7. `/galerija` — Галерија: foto/video grid (lightbox)
8. `/kontakt` — Контакт: adresa proba, mapa (embed), kontakt forma
   (Formspree ili mailto, jer nema backend-a)

Zajedničke komponente: Header (nav + jezik switch + mobile hamburger meni),
Footer (kontakt info, društvene mreže, linkovi).

## Sadržajni model (static)

- `content/news/*.json` (ili `.mdx`) — vesti, po jednom fajlu, sa poljima:
  slug, datum, naslov (sr/en), tekst (sr/en), cover slika
- `content/events.json` — lista događaja: naziv, datum, lokacija, opis
- `content/sections.json` — sekcije/ansambli
- `content/repertoire.json` — igre po regionima
- `content/gallery.json` — putanje do slika/video + kategorije

Sav UI tekst (nav, dugmad, labele) u `messages/sr.json` i `messages/en.json`
(next-intl standard).

## Vizuelni identitet

- Paleta: krem/bela pozadina, bordo (`#7a1f2b`-ish) i zlatna kao akcentne
  boje, tamnoplava kao sekundarna
- Tipografija: moderan serif ili slab-serif za naslove (dostojanstveno,
  tradicionalno), čist sans-serif za telo teksta
- Ornamenti: suptilan geometrijski/vez motiv kao border/divider element
  (SVG), NE kao pozadina cele stranice — da ostane čisto i moderno
- Mobile-first, potpuno responsive (grid koji se lomi na 1 kolonu na mobilnom)

## SEO

- Next.js `generateMetadata` po stranici (title, description, OG tags)
- `sitemap.xml` i `robots.txt` generisani (`app/sitemap.ts`, `app/robots.ts`)
- `hreflang` alternate linkovi sr/en
- Semantički HTML (header/nav/main/footer/article/section)
- OG slike po stranici (statička podrazumevana + specifične za vesti)

## Van obima (van scope-a)

- CMS/admin panel za uređivanje sadržaja bez git-a
- Baza podataka, autentifikacija, backend API
- Kalendar sa rezervacijama/RSVP
- Multi-jezik van sr/en

## Testiranje / verifikacija

- `next build` (static export) prolazi bez grešaka
- Lighthouse provera (performance/SEO/accessibility) na ključnim stranicama
- Ručna provera responsive layout-a (mobile/tablet/desktop) i jezičkog switch-a
