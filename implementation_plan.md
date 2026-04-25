# Implementation Plan — Shajidul Hoque's Space Portfolio

> Personal website with a space / anti-gravity aesthetic, terminal-inspired navigation, animated preloader, and a lazy-loaded Mux earth video footer.

---

## 1. Tech Stack & Setup

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Next.js 15 (App Router, TypeScript) | SSR, Image optimization, code-splitting out of the box |
| **Styling** | Tailwind CSS v4 | Latest utility-first CSS; installed automatically with `create-next-app --tailwind` |
| **Component Library** | shadcn/ui (`npx shadcn@latest init`) | Copy-paste primitives, fully customizable, zero runtime overhead |
| **Animations** | Framer Motion (`motion`) | `AnimatePresence` for preloader exit, `motion.div` for scroll reveals, rotating text |
| **Icons** | `@phosphor-icons/react` (Phosphor Icons) | Tree-shakeable, SSR-safe via `/ssr` sub-import, rich duotone weight for space vibe |
| **Video** | `@mux/mux-player-react` (lazy import) | First-party lazy-loading via `/lazy` entry point with `loading="viewport"` |
| **Font** | Google Fonts — **Space Mono** (terminal) + **Inter** (body) | Terminal aesthetic for nav, clean modern body text |

### Dependencies to Install

```bash
# Core (handled by create-next-app)
# next, react, react-dom, typescript, tailwindcss, eslint

# Added manually
npm install framer-motion @phosphor-icons/react @mux/mux-player-react
npx shadcn@latest init        # then add components as needed
npx shadcn@latest add button card input textarea separator badge sheet
```

---

## 2. Directory Structure

All project code lives inside `GEMINI.ai/`. The Next.js project root **is** `GEMINI.ai/`.

```
c:\Dev\Space themed portfolio\
├── BG.png                          ← source asset (hero)
├── Space.png                       ← source asset (footer)
├── design.md                       ← spec (reference only)
└── GEMINI.ai/                      ← NEXT.JS PROJECT ROOT
    ├── public/
    │   └── assets/
    │       ├── bg-hero.png          ← copied from BG.png
    │       └── space-footer.png     ← copied from Space.png
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx           ← root layout (fonts, metadata, global providers)
    │   │   ├── page.tsx             ← home page (assembles all sections)
    │   │   ├── globals.css          ← Tailwind directives + custom design tokens
    │   │   └── favicon.ico
    │   ├── components/
    │   │   ├── ui/                  ← shadcn/ui generated components
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   ├── input.tsx
    │   │   │   ├── textarea.tsx
    │   │   │   ├── separator.tsx
    │   │   │   └── badge.tsx
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx       ← terminal-style nav (desktop + mobile)
    │   │   │   └── Footer.tsx       ← Mux earth video footer
    │   │   ├── sections/
    │   │   │   ├── Preloader.tsx     ← multi-language greeting animation
    │   │   │   ├── Hero.tsx          ← BG.png background + rotating subheader
    │   │   │   ├── FeaturedPosts.tsx  ← 3 project cards
    │   │   │   ├── MoreWorks.tsx      ← project thumbnail grid
    │   │   │   ├── RecentThoughts.tsx ← blog/vlog list
    │   │   │   └── SayHi.tsx          ← contact form + info
    │   │   └── shared/
    │   │       ├── RotatingText.tsx   ← reusable AnimatePresence text cycler
    │   │       ├── SectionWrapper.tsx ← scroll-reveal wrapper (Framer motion)
    │   │       └── MuxVideoPlayer.tsx ← lazy-loaded Mux player wrapper
    │   ├── hooks/
    │   │   ├── usePreloader.ts       ← controls preloader show/hide state
    │   │   └── useMediaQuery.ts      ← responsive breakpoint detection
    │   └── lib/
    │       ├── utils.ts              ← shadcn cn() helper
    │       ├── constants.ts          ← greetings array, nav links, social links
    │       └── fonts.ts              ← Google Font loaders (Space Mono, Inter)
    ├── next.config.ts
    ├── tailwind.config.ts            ← (if not using v4 CSS-only config)
    ├── components.json               ← shadcn/ui config
    ├── tsconfig.json
    └── package.json
```

### Asset Mapping

| Source File | Destination | Used In |
|---|---|---|
| `BG.png` | `GEMINI.ai/public/assets/bg-hero.png` | `Hero.tsx` — full-viewport background via `next/image` with `fill` + `priority` |
| `Space.png` | `GEMINI.ai/public/assets/space-footer.png` | `Preloader.tsx` — static space background behind greeting cycle; also reusable in global dark sections |

> **IMPORTANT:** `BG.png` (~1.8 MB) will be served through Next.js `<Image>` with `priority` and `placeholder="blur"` (static import). At build time Next.js will auto-generate optimized WebP/AVIF variants and a blur data URL. No manual compression needed.

---

## 3. Animation Strategy

### 3A. Multi-Language Preloader

**Component:** `Preloader.tsx`
**Library:** Framer Motion

```
Flow:
1. Preloader mounts on initial page load (covers entire viewport, z-50).
2. Cycles through greetings every ~200ms using AnimatePresence.
3. After ~2.5s total, triggers exit sequence:
   - Greeting fades out (opacity 0, scale 0.8)
   - Preloader container slides UP (y: "-100vh") with a smooth ease-out curve (0.6s)
   - On exit complete → sets `isLoaded` state, unmounts Preloader from DOM.
4. Hero section is already rendered underneath (no flash of empty content).
```

**Key implementation details:**
- Use `AnimatePresence mode="wait"` for greeting text swap.
- Preloader background: `Space.png` with `object-fit: cover`.
- Greeting array stored in `constants.ts`: `["হ্যালো", "Hello", "Hola", "Bonjour", "Hallo", "Ciao", "Olá", "नमस्ते", "السلام عليكم", "你好"]`.
- `usePreloader` hook manages state: `isAnimating`, `currentIndex`, `isExiting`, `isDone`.
- Body scroll is locked (`overflow: hidden`) while preloader is active.

### 3B. Terminal Navigation States

**Component:** `Navbar.tsx`
**Library:** Framer Motion

| State | Visual |
|---|---|
| Default | White text, no prefix, `font-family: Space Mono` |
| Hover | Text turns yellow with a `>_` prefix sliding in from the left (`motion.span` with `initial={{ opacity: 0, x: -10 }}`) |
| Active | Persistent yellow color + `>_` prefix |

**Mobile hamburger:**
- shadcn `Sheet` component (slide-in drawer from right).
- Menu items stagger in with Framer Motion `staggerChildren: 0.05`.
- Hamburger icon morphs to X using `motion.path` with `pathLength` animation.

### 3C. Rotating Hero Subheader

**Component:** `RotatingText.tsx`
**Library:** Framer Motion

```
Text: "A [Designer | Researcher | Developer] Lost in Space"
```

- Words cycle every **2.5 seconds**.
- Uses `AnimatePresence mode="popLayout"` to prevent layout shifts.
- Enter: `{ opacity: 0, y: 20, filter: "blur(4px)" }` → `{ opacity: 1, y: 0, filter: "blur(0px)" }`.
- Exit: `{ opacity: 0, y: -20, filter: "blur(4px)" }`.
- Transition: `{ duration: 0.5, ease: "easeInOut" }`.
- Container has `overflow: hidden` and fixed height matching font size.

### 3D. Scroll-Reveal Sections

**Component:** `SectionWrapper.tsx`
**Library:** Framer Motion

- Wraps each content section (`FeaturedPosts`, `MoreWorks`, `RecentThoughts`, `SayHi`).
- Uses `whileInView` with `viewport={{ once: true, amount: 0.2 }}`.
- Animation: fade-in + subtle slide-up (`y: 40 → 0`, `opacity: 0 → 1`).
- Stagger children cards within `FeaturedPosts` using `staggerChildren: 0.15`.

---

## 4. Performance Strategy

### 4A. Image Optimization

#### Hero Background (`BG.png` → `bg-hero.png`)

```tsx
// Hero.tsx
import heroImg from '@/../public/assets/bg-hero.png'; // static import for auto blur

<div className="relative w-full h-screen">
  <Image
    src={heroImg}
    alt="Space themed hero background"
    fill
    priority                    // ← preloads for LCP
    placeholder="blur"          // ← auto-generated from static import
    sizes="100vw"
    className="object-cover"
    quality={85}
  />
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</div>
```

**Why this works:**
- `priority` disables lazy-loading, ensuring the hero image starts downloading immediately.
- `placeholder="blur"` shows a blurred preview during load (no CLS, great perceived speed).
- `sizes="100vw"` tells the browser this is a full-width image, so it picks the right srcset variant.
- Next.js auto-generates WebP/AVIF at multiple breakpoints.

#### Footer Background (`Space.png` → `space-footer.png`)

- **No `priority`** — this is far below the fold.
- Default lazy-loading via `next/image` handles this automatically.
- Also uses `fill` + `object-cover` + `placeholder="blur"` (static import).

### 4B. Mux HLS Video (Lazy-Loaded Earth)

**Component:** `MuxVideoPlayer.tsx`

```tsx
'use client';

import MuxPlayer from '@mux/mux-player-react/lazy';  // ← lazy entry point

export default function MuxVideoPlayer() {
  return (
    <MuxPlayer
      playbackId="Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g"
      loading="viewport"         // ← only initializes when scrolled into view
      autoPlay="muted"
      loop
      muted
      style={{ aspectRatio: '16/9', width: '100%', height: '100%' }}
      className="absolute inset-0 object-cover"
    />
  );
}
```

**Performance guarantees:**
1. **Code-split**: The `/lazy` import moves the entire Mux player bundle into a separate chunk — zero bytes on initial page load.
2. **Viewport-gated**: `loading="viewport"` means the player only initializes (and starts the HLS stream) when the `IntersectionObserver` detects the footer is visible.
3. **Aspect ratio set inline**: Prevents CLS before the player mounts.
4. **No bandwidth wasted**: The HLS `.m3u8` manifest and video segments are only fetched when the user is near the footer.

### 4C. Additional Performance Measures

| Technique | Applied To |
|---|---|
| `next/font` for Google Fonts | Eliminates render-blocking font requests; uses `font-display: swap` |
| `React.lazy` + `Suspense` | Optional for heavy below-fold sections if bundle grows |
| Metadata API | SEO `<title>`, `<meta>` in `layout.tsx` via Next.js `metadata` export |
| `will-change: transform` | Applied sparingly to animated elements (preloader, rotating text) |

---

## 5. Execution Phases

### Phase 1 — Workspace, Assets & Project Scaffolding
**Estimated effort: ~1 session**

- [ ] Scaffold Next.js inside `GEMINI.ai/` using `npx create-next-app@latest ./` with TypeScript, Tailwind, App Router, `src/` directory.
- [ ] Install dependencies: `framer-motion`, `@phosphor-icons/react`, `@mux/mux-player-react`.
- [ ] Initialize shadcn/ui: `npx shadcn@latest init` (New York style, dark theme, CSS variables).
- [ ] Add required shadcn components: `button`, `card`, `input`, `textarea`, `separator`, `badge`, `sheet`.
- [ ] Copy `BG.png` → `public/assets/bg-hero.png`, `Space.png` → `public/assets/space-footer.png`.
- [ ] Set up Google Fonts (`Space Mono` + `Inter`) in `src/lib/fonts.ts` and apply in `layout.tsx`.
- [ ] Configure `globals.css` with custom design tokens (space color palette, terminal green/yellow accents).
- [ ] Create `src/lib/constants.ts` with greetings array, nav links, social links.
- [ ] Verify dev server runs cleanly: `npm run dev`.

---

### Phase 2 — Global UI & Mobile Responsiveness
**Estimated effort: ~1–2 sessions**

- [ ] Build `Navbar.tsx` — terminal-style desktop nav + mobile hamburger (shadcn `Sheet`).
- [ ] Implement active/hover states with `>_` prefix animation (Framer Motion).
- [ ] Build `Footer.tsx` — `>_Floating ideas into existence` header, social links (Phosphor Icons), "Available for projects" badge.
- [ ] Integrate `MuxVideoPlayer.tsx` into Footer as background element.
- [ ] Wire up `layout.tsx` with Navbar + Footer wrapping `{children}`.
- [ ] Test full mobile responsiveness at 375px, 768px, 1024px, 1440px breakpoints.

---

### Phase 3 — Sections & Animations
**Estimated effort: ~2–3 sessions**

- [ ] Build `Preloader.tsx` — multi-language greeting cycle with fade/slide-up exit transition.
- [ ] Build `Hero.tsx` — full-viewport BG.png background + "Shajidul Hoque" header + `RotatingText` subheader.
- [ ] Build `RotatingText.tsx` — `AnimatePresence` cycling "Designer", "Researcher", "Developer".
- [ ] Build `SectionWrapper.tsx` — scroll-triggered fade-in/slide-up reveal.
- [ ] Build `FeaturedPosts.tsx` — 3 staggered project cards (shadcn `Card`).
- [ ] Build `MoreWorks.tsx` — responsive project thumbnail grid.
- [ ] Build `RecentThoughts.tsx` — blog/vlog list with read time and date.
- [ ] Build `SayHi.tsx` — contact form (shadcn `Input`, `Textarea`, `Button`) + contact info.
- [ ] Wrap each section in `SectionWrapper` for scroll reveal.

---

### Phase 4 — Integration, Polish & Verification
**Estimated effort: ~1 session**

- [ ] Assemble all sections in `page.tsx` in correct scroll order: `Preloader → Hero → FeaturedPosts → MoreWorks → RecentThoughts → SayHi → Footer`.
- [ ] Audit animations: preloader timing, rotating text rhythm, scroll reveal thresholds.
- [ ] Performance audit: Lighthouse run targeting LCP < 2.5s, CLS < 0.1, FID < 100ms.
- [ ] Verify Mux video is NOT fetched until footer scrolls into viewport (Network tab check).
- [ ] Cross-browser test: Chrome, Firefox, Safari, Edge.
- [ ] Mobile touch/scroll test on real devices or emulators.
- [ ] Final code cleanup: remove dead code, ensure consistent naming, add JSDoc to key components.
- [ ] Production build test: `npm run build && npm run start` — verify zero errors.

---

## User Review Required

> **IMPORTANT — Tailwind CSS version**: The plan assumes Tailwind CSS v4 (shipped with latest `create-next-app`). If you need v3 for plugin compatibility, please let me know — it changes the config file structure.

> **IMPORTANT — shadcn/ui style**: I'm defaulting to the **"New York"** style variant with a dark theme and CSS variables. Confirm if you prefer the **"Default"** style instead.

> **IMPORTANT — Font choice**: The spec says "terminal-inspired" navigation. I've chosen **Space Mono** (a monospace Google Font designed for space themes) + **Inter** for body text. If you have a different font preference, let me know before Phase 1.

## Open Questions

> **Content data**: The design spec references project cards, blog posts, and contact info. Should these be **hardcoded** for now (static JSON/arrays), or do you want a CMS/data layer (e.g., MDX files, a headless CMS) from day one?

> **Routing**: The nav includes "Home, About, Work, Blog, Say Hi." Should these be **separate pages** (Next.js routes: `/`, `/about`, `/work`, `/blog`, `/contact`) or **scroll-anchored sections** on a single page? The design spec describes a continuous scroll flow, suggesting a single-page layout — please confirm.

> **Contact form backend**: The "Say Hi" section includes a form. Should it be purely visual for now, or do you want a functional submission handler (e.g., email via Resend, or a serverless API route)?

---

## Verification Plan

### Automated Checks
- `npm run build` — zero TypeScript errors, zero build warnings.
- Lighthouse audit via Chrome DevTools (target: Performance >= 90, Accessibility >= 95).
- `next/image` warning check — ensure no missing `sizes`, `alt`, or unoptimized images.

### Manual Verification
- Browser dev tools Network tab: confirm Mux `.m3u8` manifest is NOT fetched until footer is in viewport.
- Visual check: preloader → hero transition is seamless (no flash of unstyled content).
- Mobile responsiveness at 375px (iPhone SE), 768px (iPad), 1440px (desktop).
- Keyboard navigation and focus states on all interactive elements.
