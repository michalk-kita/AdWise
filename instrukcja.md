# Instrukcja startu projektu Astro → Figma

## Mapa całości

```
FAZA 1 — Przygotowanie (przed kodem)     ~1-2h
FAZA 2 — Init projektu                   ~30min
FAZA 3 — Design System                   ~2-4h
FAZA 4 — Komponenty bazowe               ~4-8h
FAZA 5 — Strony i blog                   iteracyjnie
```

---

## FAZA 1 — Przygotowanie (zrób to PRZED odpaleniem terminala)

### 1.1 Wyciągnij tokeny z Figmy

Otwórz Figmę i zapisz do pliku tekstowego:

**Kolory** — wejdź w każdy styl koloru i skopiuj hex:
```
primary:     #------
secondary:   #------
accent:      #------
background:  #------
text:        #------
muted:       #------
border:      #------
```

**Typografia** — dla każdego text style:
```
font-heading:  [nazwa fontu] / [weight]
font-body:     [nazwa fontu] / [weight]
font-mono:     [nazwa fontu] / [weight]  (jeśli jest)

size-xs:    [px]
size-sm:    [px]
size-base:  [px]
size-lg:    [px]
size-xl:    [px]
size-2xl:   [px]
size-3xl:   [px]
size-4xl:   [px]
```

**Spacing** — sprawdź co się powtarza w Auto Layout:
```
spacing-1:  4px
spacing-2:  8px
...
section-padding-y:  [px]
container-max:      [px]
```

**Breakpointy** — sprawdź czy są w Figmie:
```
mobile:   375px
tablet:   768px
desktop:  1280px (lub 1440px)
```

> Tip: Jeśli masz Figma Variables (nowe), użyj pluginu
> **Token Studio** → eksportuj do JSON → przepiszesz na CSS variables.
> Jeśli nie — przepisz ręcznie, to 30 minut i warto.

---

### 1.2 Zrób inwentarz komponentów z Figmy

Przejdź przez WSZYSTKIE strony i wypisz powtarzające się elementy:

**Atomy (małe, bez logiki):**
- [ ] Button (ile wariantów? primary/secondary/ghost/icon)
- [ ] Badge / Tag
- [ ] Input, Textarea, Select
- [ ] Card (ile wariantów?)
- [ ] Avatar
- [ ] Icon wrapper
- [ ] Divider

**Sekcje (bloki strony):**
- [ ] Navbar (czy jest sticky? hamburger?)
- [ ] Hero (ile wariantów?)
- [ ] Features / Grid
- [ ] Testimonials
- [ ] Pricing
- [ ] FAQ
- [ ] CTA banner
- [ ] Footer

**Layouty:**
- [ ] Strona główna
- [ ] Podstrona standardowa
- [ ] Blog listing
- [ ] Blog post
- [ ] Landing page (jeśli różni się)

> Zapisz to — wkleisz do CLAUDE.md jako listę do odhaczania.

---

### 1.3 Ustal kolejność stron

Posortuj strony od NAJWAŻNIEJSZEJ do najmniej ważnej.
Zaczniesz od jednej — tej która ma najwięcej komponentów, żeby zbudować design system.

---

## FAZA 2 — Init projektu (terminal)

```bash
# Stwórz projekt
npm create astro@latest my-project -- --template minimal
cd my-project

# Dodaj Tailwind v4
npm install tailwindcss@next @tailwindcss/vite@next

# Dodaj React (tylko jeśli WIESZ że będziesz potrzebował)
npx astro add react

# TypeScript jest domyślnie - zostaw
```

### 2.1 Skonfiguruj Tailwind v4 w Astro

Edytuj `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react'; // tylko jeśli dodałeś React

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()], // tylko jeśli dodałeś React
});
```

### 2.2 Stwórz strukturę folderów

```bash
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/components/interactive
mkdir -p src/layouts
mkdir -p src/styles
mkdir -p src/content/blog
```

### 2.3 Stwórz plik tokenów

`src/styles/tokens.css` — wklej tutaj WSZYSTKO z Fazy 1.1:

```css
@import "tailwindcss";

@theme {
  /* Kolory */
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-background: #ffffff;
  --color-text: #0f172a;
  --color-muted: #94a3b8;
  --color-border: #e2e8f0;

  /* Typografia */
  --font-heading: "YourHeadingFont", sans-serif;
  --font-body: "YourBodyFont", sans-serif;

  /* Spacing */
  --spacing-section: 6rem;
  --spacing-container: 1280px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```

`src/styles/global.css`:
```css
@import "./tokens.css";

/* Fonty - wklej @font-face lub link do Google Fonts */

html {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

.container {
  max-width: var(--spacing-container);
  margin-inline: auto;
  padding-inline: 1.5rem;
}
```

### 2.4 Base layout

`src/layouts/Base.astro`:
```astro
---
import '../styles/global.css';
import NavBar from '../components/sections/NavBar.astro';
import Footer from '../components/sections/Footer.astro';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const { title, description = '', ogImage } = Astro.props;
---

<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
    {ogImage && <meta property="og:image" content={ogImage} />}
  </head>
  <body>
    <NavBar />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### 2.5 Content Collections dla bloga

`src/content/config.ts`:
```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().optional(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

### 2.6 Zainicjuj git i CLAUDE.md

```bash
git init
git add .
git commit -m "init: astro + tailwind v4 + structure"
touch CLAUDE.md
```

---

## FAZA 3 — Wypełnij CLAUDE.md (zrób to TERAZ)

Wklej poniżej i wypełnij swoimi danymi:

```markdown
# [Nazwa Projektu] — CLAUDE.md

## Kontekst projektu
[Opisz projekt w 2-3 zdaniach. Co to jest, dla kogo, jaki cel.]

## Stack
- Astro 5 (SSG)
- Tailwind v4 (tokeny w src/styles/tokens.css)
- React — TYLKO dla interaktywnych komponentów (formularze, slidery)
- TypeScript — props interfaces i content schema
- Content Collections — blog (src/content/blog/)

## Figma
- Link: [WKLEJ LINK DO FIGMY]
- Jak czytać: [np. "każda strona Figmy = folder w src/pages/"]
- Warianty komponentów: [np. "Button ma 3 warianty: primary, secondary, ghost"]

## Design System — WAŻNE
Wszystkie tokeny są w `src/styles/tokens.css`.
ZAWSZE używaj CSS variables lub klas Tailwind.
NIGDY nie hardcoduj kolorów, fontów ani spacingu inline.

### Kolory
- Brand primary: --color-primary
- Tekst: --color-text
- Tło: --color-background
- Muted: --color-muted

### Typografia
- Headingi: font-heading (--font-heading)
- Body: font-body (--font-body)

### Spacing
- Padding sekcji Y: spacing-section (var(--spacing-section))
- Max szerokość: .container

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
6. Obrazki: zawsze przez <Image /> z astro:assets (optymalizacja)
7. Teksty: ZAWSZE przez props, nie hardcodowane w komponentach

## Co mamy gotowe ✅
- [ ] Design tokens (tokens.css)
- [ ] Base.astro
- [ ] NavBar.astro
- [ ] Footer.astro
- [ ] Button.astro
- [ ] Card.astro
- [ ] BlogPost.astro layout
- [ ] Blog routing ([slug].astro)

## Strony do zrobienia
### [Nazwa strony 1]
- [ ] Hero
- [ ] [Sekcja 2]
- [ ] [Sekcja 3]

### [Nazwa strony 2]
...

## Czego NIE robić
- NIE używaj inline styles (`style="..."`)
- NIE importuj zewnętrznych UI libraries (shadcn, MUI itp.)
- NIE twórz CSS Modules — tylko Tailwind klasy
- NIE hardcoduj breakpointów — używaj sm:/md:/lg: z Tailwind
- NIE duplikuj layoutów
- NIE pisz JS gdzie wystarczy CSS

## Jak pracować z tym projektem
Przy każdym nowym komponencie:
1. Powiedz który plik z Figmy
2. Powiedz do którego layoutu należy
3. Wklej screenshot z Figmy jeśli to pomaga

Przy nowych stronach:
Zawsze zaczynamy od listy sekcji, potem robimy je jedna po drugiej.
```

---

## FAZA 4 — Kolejność budowania (trzymaj się tego)

```
1. tokens.css          ← wypełnij WSZYSTKIE tokeny z Figmy
2. global.css          ← reset, fonty, .container
3. Base.astro          ← layout
4. NavBar.astro        ← najpierw desktop, potem mobile
5. Footer.astro
6. Button.astro        ← wszystkie warianty naraz
7. Card.astro
8. Badge.astro
9. [pozostałe ui/]
10. Pierwsza STRONA    ← zacznij od homepage
    └── Hero.astro
    └── [kolejne sekcje]
11. BlogPost.astro layout
12. [slug].astro routing
13. Pozostałe strony
```

**Zasada:** Skończ jedno zanim zaczniesz drugie. Nie skacz między stronami.

---

## FAZA 5 — Workflow z Claude Code (jak to robić na co dzień)

### Na początku sesji:
```
"Pracujemy nad [nazwa projektu], stack opisany w CLAUDE.md.
Dziś robimy: [konkretny komponent/strona].
Oto screenshot z Figmy: [wklej obrazek]"
```

### Przy nowym komponencie:
```
"Stwórz src/components/sections/Hero.astro zgodnie z CLAUDE.md.
Komponent przyjmuje props: title, subtitle, ctaText, ctaHref, image.
Użyj tokenów z tokens.css. Screenshot: [obrazek]"
```

### Przy debugowaniu wyglądu:
```
"To nie wygląda jak w Figmie. Figma: [screenshot].
Mamy teraz: [screenshot lub opis różnicy].
Popraw spacing/typografię/kolory."
```

### Nigdy nie proś Claude Code o:
- "Zrób całą stronę" ← za dużo naraz, wyjdzie źle
- "Zrób cały design system" ← jeden komponent na raz
- Zmiany w tokens.css bez pokazania Figmy

---

## Checklisty

### Zanim zaczniesz kodować (Faza 1-2)
- [ ] Tokeny z Figmy wypisane
- [ ] Inwentarz komponentów zrobiony
- [ ] Kolejność stron ustalona
- [ ] Projekt zainicjowany
- [ ] tokens.css wypełniony
- [ ] CLAUDE.md wypełniony

### Zanim opublikujesz stronę
- [ ] Obrazki przez `<Image />` z astro:assets
- [ ] Każda strona ma title i description w Base.astro
- [ ] Brak hardcodowanych kolorów/fontów poza tokens.css
- [ ] Nawigacja działa na mobile
- [ ] Blog działa (getCollection, routing)
- [ ] `astro build` przechodzi bez błędów

---

## TL;DR — co zrobić TERAZ w tej kolejności

1. **Teraz (30 min):** Wyciągnij tokeny z Figmy do pliku tekstowego
2. **Teraz (30 min):** Wypisz komponenty i kolejność stron
3. **Teraz (30 min):** `npm create astro@latest`, dodaj Tailwind v4
4. **Teraz (20 min):** Stwórz strukturę folderów
5. **Teraz (30 min):** Wypełnij tokens.css danymi z Figmy
6. **Teraz (15 min):** Wypełnij CLAUDE.md swoimi danymi
7. **Teraz (15 min):** Stwórz Base.astro z NavBar/Footer placeholder
8. **Od jutra:** Komponenty ui/ jeden po jednym z Claude Code