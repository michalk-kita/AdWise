# AdWise — CLAUDE.md

## Kontekst projektu
Rozbudowana strona internetowa dla agencji marketingowej/reklamowej AdWise.
Budowana na podstawie projektu Figma z design tokenami wyeksportowanymi do JSON.

## Stack
- Astro 5 (SSG)
- Tailwind v4 (tokeny w src/styles/tokens.css)
- React — TYLKO dla interaktywnych komponentów (formularze, slidery) — jeszcze nie dodany
- TypeScript — props interfaces i content schema (strict mode)
- Content Collections — blog (src/content/blog/)

## Figma
- Linki do Figmy podawane per sekcja/komponent (link do edycji przy każdym zadaniu)
- Tokeny wyeksportowane z Figmy do `../design-tokens.tokens.json`

## Design System — WAŻNE
Wszystkie tokeny są w `src/styles/tokens.css`.
ZAWSZE używaj CSS variables lub klas Tailwind.
NIGDY nie hardcoduj kolorów, fontów ani spacingu inline.

### Kolory
**Tła:**
- `--color-bg-light` (#ffffff) — główne jasne tło
- `--color-bg-accent` (#971df6) — akcent fioletowy
- `--color-bg-accent-light` (#dbadff) — jasny fiolet
- `--color-bg-primary` (#14101e) — ciemne tło
- `--color-bg-secondary` (#f5f7fc) — drugie jasne tło
- `--color-bg-accent-hover` (#bb65ff) — hover akcentu
- `--color-bg-primary-hover` (#2b243c) — hover ciemnego
- `--color-bg-separator` (#e1e1ec) — separator

**Tekst:**
- `--color-text-primary` (#14101e) — główny tekst
- `--color-text-light` (#ffffff) — tekst na ciemnym tle
- `--color-text-accent` (#971df6) — akcent
- `--color-text-accent-light` (#dbadff) — jasny akcent
- `--color-text-secondary` (#f0f4fc) — drugoplanowy
- `--color-text-muted` (#83828a) — wyciszony

**Elementy:**
- `--color-separator` (#e1e1ec), `--color-stroke` (#bec5d1), `--color-stroke-accent` (#971df6)
- `--color-separator-dark` (#2b243c), `--color-grid-decor` (#7b7b7b)

### Typografia
- Font: **Aeonik Pro** (wagi: 400 regular, 500 medium)
- Pliki fontów: dodaj do `public/fonts/` i zadeklaruj `@font-face` w global.css
- Headingi: `font-heading` (--font-heading)
- Body: `font-body` (--font-body)
- Klasy utility: `.text-h1`–`.text-h6`, `.text-header-xs/m/l`, `.text-nav-link`, `.text-small-link`, `.text-intro`, `.text-paragraph`, `.text-preheader`
- Mobile overrides automatycznie na max-width: 768px

### Spacing
- Padding sekcji Y: `spacing-section` (var(--spacing-section) = 6rem)
- Max szerokość: `.container` (1280px)

## Struktura plików
```
src/
├── components/
│   ├── ui/          ← atomowe: Button, Badge, Card, Input
│   ├── sections/    ← bloki: Hero, FAQ, Pricing, NavBar, Footer
│   └── interactive/ ← React: ContactForm, Slider (z client:load)
├── layouts/
│   ├── Base.astro
│   └── BlogPost.astro
├── pages/           ← 1 plik = 1 URL
├── styles/
│   ├── tokens.css   ← jedyne źródło prawdy dla tokenów
│   └── global.css
└── content/
    └── blog/        ← .md lub .mdx
```

## Konwencje BEZWZGLĘDNE
1. Nazwy plików: PascalCase dla komponentów, kebab-case dla stron i treści
2. Każdy komponent Astro MA mieć Props interface (nawet pusty)
3. Nie twórz nowego komponentu jeśli pasuje istniejący
4. Sekcja strony = osobny plik w src/components/sections/
5. React tylko z dyrektywą client:load / client:visible
6. Obrazki: zawsze przez `<Image />` z astro:assets (optymalizacja)
7. Teksty: ZAWSZE przez props, nie hardcodowane w komponentach

## Co mamy gotowe
- [x] Design tokens (tokens.css)
- [x] global.css
- [x] Base.astro
- [x] NavBar.astro (placeholder)
- [x] Footer.astro (placeholder)
- [x] Content Collections config (blog)
- [x] Struktura folderów
- [ ] Pliki fontu Aeonik Pro
- [ ] Button.astro
- [ ] Card.astro
- [ ] BlogPost.astro layout
- [ ] Blog routing ([slug].astro)

## Strony do zrobienia
### Homepage
- [ ] Hero
- [ ] [kolejne sekcje — podaj link do Figmy]

### Pozostałe strony
[Podaj linki do Figmy per strona]

## Czego NIE robić
- NIE używaj inline styles (`style="..."`)
- NIE importuj zewnętrznych UI libraries (shadcn, MUI itp.)
- NIE twórz CSS Modules — tylko Tailwind klasy
- NIE hardcoduj breakpointów — używaj sm:/md:/lg: z Tailwind
- NIE duplikuj layoutów
- NIE pisz JS gdzie wystarczy CSS

## Jak pracować z tym projektem
Przy każdym nowym komponencie:
1. Wklej link do Figmy (edycja) dla danej sekcji
2. Powiedz do którego layoutu należy
3. Wklej screenshot z Figmy jeśli to pomaga

Przy nowych stronach:
Zawsze zaczynamy od listy sekcji, potem robimy je jedna po drugiej.
