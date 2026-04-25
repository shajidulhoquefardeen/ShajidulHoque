# GEMINI.ai Portfolio Project Documentation

> **IMPORTANT**: This document is the single source of truth for the architecture, components, and progress of the Space Portfolio project located in the `GEMINI.ai` directory. **It must be updated whenever new features, components, or major changes are introduced.**

## 🚀 Project Overview
A highly aesthetic, premium space-themed personal portfolio for Shajidul Hoque. Built with a focus on animations, glassmorphism, terminal-style interfaces, and zero-cost static hosting.

- **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React 19.
- **UI Library**: shadcn/ui (New York style, base-nova).
- **Animations**: Framer Motion.
- **Icons**: Phosphor Icons (`@phosphor-icons/react`).
- **Media**: Mux HLS Video Player (`@mux/mux-player-react`).
- **Emails**: Resend API (`resend`).
- **Hosting**: Vercel ($0 budget constraint — static data layers only).

---

## 📂 Directory Structure (`src/`)

```text
GEMINI.ai/
├── public/assets/          # Static images (bg-hero.png, space-footer.png)
├── src/
│   ├── app/                # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   │   ├── api/contact/    # Contact form API route (Resend integration)
│   │   └── work/           # Work portfolio gallery page (page.tsx)
│   ├── components/         # All React components
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Preloader, Hero, FeaturedPosts, MoreWorks, RecentThoughts, SayHi
│   │   ├── shared/         # Reusable (RotatingText, SectionWrapper, MuxVideoPlayer)
│   │   └── ui/             # shadcn/ui primitives
│   ├── data/               # Static JSON/TS data layers for $0 DB cost
│   │   ├── projects.ts     # Portfolio works data
│   │   └── blog.ts         # Blog post data
│   ├── hooks/              # Custom React hooks
│   │   ├── usePreloader.ts # Manages greeting cycle & exit animation
│   │   └── useMediaQuery.ts# Responsive viewport detection
│   └── lib/                # Utilities and constants
│       ├── constants.ts    # Global config (nav links, greetings, social info)
│       ├── fonts.ts        # next/font definitions
│       └── utils.ts        # Tailwind merge utilities
```

---

## 🎨 Design System (`globals.css`)

The project uses a **strict dark mode** (`#0a0a0f` space black background).

**Typography:**
- `Montserrat`: Applied globally as both the primary sans and mono font, governing all headings, body text, terminal prefixes, and UI elements.

**Color Palette (CSS Variables):**
- `--color-space-black`: `#0a0a0f` (Main BG)
- `--color-terminal-yellow`: `#e5a220` (Primary Accent, Active States)
- `--color-terminal-green`: `#22c55e` (Status Indicators)
- `--color-space-navy`: `#111827` (Card BGs)

**Custom Utilities:**
- `.glass-card`: Translucent background with backdrop blur (`blur(16px)`).
- `.glass-card-hover`: Yellow border highlight and glow on hover.
- `.section-heading`: Monospace font with `>_` or `/` prefix injected via CSS `::before`.
- Custom Webkit scrollbar matching the terminal yellow theme.
- **Background Strategy**: To prevent image stretching and pixelation on long scrollable pages, the site uses a **fixed viewport background**.
  - **Global Space Background**: A fixed `div` with `z-index: 0` covers the entire viewport. It contains the high-resolution space image and a dark overlay, ensuring the background remains crisp while content scrolls over it.
  - **Hero Background**: The man-in-space image is strictly contained within the `h-screen` Hero section to prevent bleeding into other sections.
  - **Section Transparency**: Content sections (`FeaturedPosts`, `MoreWorks`, etc.) are transparent by default, allowing the persistent space background to show through seamlessly.

---

## 🧩 Component Library

### 1. Layout Components
- **`Navbar`**: Fixed, glassmorphic header. Features bolder typography, terminal-style `>_` prefixes, active section color styling (primary yellow), IntersectionObserver to detect scroll position, and a mobile `Sheet` drawer with staggered item reveals. Removed border dividers for a cleaner aesthetic.
- **`Footer`**: Layered footer. Features a static fallback image (`space-footer.png`) beneath a lazy-loaded Mux Video player (rotating earth). The video is rotated 180 degrees (`rotate-180`) to ensure the earth is oriented at the bottom of the frame per design. The tagline heading is scaled down (`text-2xl/3xl/4xl/5xl`) and set to `font-semibold` for a more elegant visual balance. Includes social links and an animated "Available for projects" status badge. *UI Refinement: Tightened vertical spacing to reduce overall height and pull the horizontal separator closer to the tagline.*

### 2. Section Components
- **`Preloader`**: Full-screen overlay that cycles through a strictly curated list of 6 languages (Bengali, English, French, Portuguese, Arabic, Chinese).
  - **Animation**: Operates in a linear, non-looping sequence. Each word is displayed for 500ms to ensure readability.
  - **Exit Sequence**: The final greeting ("你好") is held for a deliberate 1200ms pause, followed by a smooth 700ms slide-up transition (`y: -100%`) into the Hero section.
  - **Logic**: Managed by a custom `usePreloader` hook that handles indices and state transitions sequentially.
  - **Structure**: Uses a full-width, bottom-aligned flex container (`flex-row justify-between items-end`) to separate the left text block and right UI elements.
  - **Left Block**: Features a highly balanced typographic scale. The main heading ("Shajidul Hoque") is scaled down (`text-3xl/4xl/5xl`) and strictly enforced to `font-semibold` (weight 600) via explicit Next.js font loading. The vertically stacked subheader ("A ↘", `RotatingText`, "Lost in Space") is scaled up (`text-xl/2xl/3xl`) to act as a strong supporting pillar rather than fine print.
  - **Right Block**: Contains two ultra-sleek buttons (a primary yellow "Contact Me" and a secondary white "View Projects" with minimal padding and `text-xs` sizing) pushed entirely to the right. Social icons have been removed from this section to declutter the focal area.
  - **Background**: `bg-hero.png` positioned with `object-bottom` to ensure the subject's body is never cropped at the bottom viewport edge. Rendered at exactly `opacity-50` over a strict `bg-black` container to deeply dim the image into the shadows, making the foreground typography pop brilliantly.
- **`FeaturedPosts`**: Displays top 3 projects using `.glass-card`.
- **`MoreWorks`**: A responsive 3-column grid of project thumbnails with hover overlays.
- **`RecentThoughts`**: A sleek list of blog posts with numbered circle icons, read times, and dates.
- **`SayHi`**: A 2-column contact section. Left side holds contact info and a "What to Expect" accordion. Right side holds a functional form with loading/success/error states.

### 3. Shared/Utility Components
- **`MuxVideoPlayer`**: Wraps the Mux player, imported via `/lazy`, using `loading="viewport"` to defer loading until scrolled into view. All UI controls are stripped via CSS variables.
- **`RotatingText`**: Uses Framer Motion's `AnimatePresence` with `mode="popLayout"` to animate text in/out with a blur effect.
- **`SectionWrapper`**: Wraps every major section, applying a consistent scroll-triggered `whileInView` fade-in and slide-up animation.

---

## ⚙️ Configuration & API

### Contact Route (`/api/contact/route.ts`)
Handles form submissions from the `SayHi` component.
- Validates name, email, and message.
- Uses `resend` to dispatch emails.
- Requires `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local`.

### Next.js Config (`next.config.ts`)
- Modified to explicitly allow `qualities: [75, 90]` for Next Image components, ensuring high-quality rendering for the hero background.

---

## ✅ Progress & Milestones

**Phase 1 & 2 Completed (April 2026)**
- Scaffolded architecture and resolved `npm` package name collisions.
- Built complete UI layer mimicking the provided Figma/design system.
- Implemented static data approach to guarantee $0 hosting costs.
- Resolved hydration mismatches (nested buttons in Radix UI `SheetTrigger`).
- Production build passes successfully.

**Next Steps (Phase 3 & Beyond)**
- Final mobile polish and cross-browser testing.
- Connect Resend API key for live email testing.
- Deploy to Vercel.

**Recent Additions**
- Built `/work` page with dynamic category filtering and masonry layout using Framer Motion.
- Extended `projects.ts` data to include categorization and skills array.
- Updated global Navbar "Work" link and Home page "View All" links to seamlessly route to the new `/work` page using Next.js `<Link>`.

- **Dynamic Project Routing**: Implemented a robust dynamic routing system for individual project pages.
  - **Data Layer**: Extended `Project` interface and `ALL_PROJECTS` data with `slug`, `fullDescription`, `youtubeUrl`, and `fullImage` fields.
  - **Work Gallery**: Updated `/work` gallery cards to use Next.js `<Link>` components, routing users to `/work/[slug]`.
  - **Detail Pages**: Created a dynamic `app/work/[slug]/page.tsx` template that renders project-specific content, supporting responsive YouTube embeds and high-resolution, uncropped image displays while maintaining the site's signature space aesthetic and global layout.

- **Blog Section**: Built a comprehensive blog architecture.
  - **Data Layer**: Established a rich mock data model in `data/blog.ts` with HTML content support for articles.
  - **Listing Page**: Created `app/blog/page.tsx` featuring a personalized header, rounded flex-layout cards, and interactive hover states.
  - **Dynamic Article Routing**: Implemented `app/blog/[slug]/page.tsx` for individual posts, ensuring optimal readability with `prose` styling, strict no-cropping rules for featured images, and consistent navigation.
  - **Global Navigation**: Wired up the global Navbar and Homepage "Recent Thoughts" section to seamlessly integrate with the new `/blog` routes.

- **Interactive FAQ Section**: Built and integrated a new stateful Accordion component.
  - **Data Structure**: Implemented a custom 5-question data array addressing specific services (digital design, industrial formulations, and specialized PPTs).
  - **Component UI (`FAQ.tsx`)**: Built a fully responsive accordion using `framer-motion` for smooth height reveals. Styled with a brand-compliant aesthetic using `terminal-yellow` accents, `bg-white/5` glass-style cards, and explicit `Montserrat` typography to match the space theme.
  - **Integration**: Inserted directly above the "Say Hi" section on the main landing page (`app/page.tsx`) with ample vertical padding.

- **UI Refinements**:
  - **Terminal Prompt Alignment**: Adjusted the baseline of the terminal prompt prefix (`>_`) across the Navbar, Work filters, and Footer. The underscore character in the Montserrat font floats unnaturally high, visually resembling a hyphen (`>-`). Wrapped the underscore in a `<span>` with a subtle vertical translation (`translate-y`) to pull it down to the baseline, ensuring it clearly reads as a terminal prompt.

  - **Sanity Migration Regression Fixes (April 2026)**:
    - **Image Gap Fix**: Added `w-full` and `h-full` to image wrapper `div` containers in `WorkPageClient.tsx`, `FeaturedPosts.tsx`, and `MoreWorks.tsx`. All card thumbnails use `object-cover` on `<Image fill>` to ensure full bleed without gaps at edges.
    - **Card Link Routing**: Enforced strict template literal construction `href={\`/work/${project.slug}\`}` across all gallery components. Wrapped the entire `Card` in `FeaturedPosts.tsx` in a `Link` to ensure homepage featured projects are fully interactive, matching the behavior of the `/work` grid. Fixed a critical 404 regression by implementing `decodeURIComponent(slug)` in the project detail page.
    - **Detail Page Restoration** (`app/work/[slug]/page.tsx`): Restored the pre-migration layout structure:
      - Header renders as `/{Project Name}` with accent-colored slash.
      - `fullDescription` renders in a centered `max-w-4xl` container.
      - Conditional media: YouTube `<iframe>` (16:9 aspect) if `youtubeUrl` exists; `<Image>` with `width={0} height={0} sizes="100vw"` and `className="w-full h-auto object-contain"` if `fullImage` exists — scales naturally without cropping.
      - Space background and Footer remain intact.

- **Performance Optimizations (April 2026)**:
  - **Preloader Session Persistence**: Updated `usePreloader` hook to verify `sessionStorage` upon mounting. If the preloader has already been seen in the current session, the animation is bypassed entirely, reducing navigation latency by ~3 seconds.
  - **Concurrent Data Fetching**: Verified and ensured that the Home page server component (`app/page.tsx`) uses `Promise.all()` to fetch featured projects, more works, and recent blog posts concurrently rather than sequentially.
  - **Streaming & Suspense**: Integrated React `Suspense` boundaries around heavy content sections (`FeaturedPosts`, `MoreWorks`, `RecentThoughts`) in `HomeContent.tsx`. This allows the page shell to render immediately while dynamic content loads in the background.

- **Incremental Static Regeneration (ISR) (April 2026)**:
  - **Data Revalidation**: Implemented `export const revalidate = 60;` in `app/page.tsx`, `app/blog/page.tsx`, and `app/work/page.tsx`. This ensures that Next.js automatically fetches fresh data from Sanity in the background at most once every minute, allowing new posts and projects to appear on the live site without manual redeploys.

- **Global Navbar Restoration (April 2026)**:
  - **Root Layout Integration**: Moved the `Navbar` component from individual page files to the `src/app/layout.tsx` file. This ensures the navigation bar is automatically present on all routes, including `/blog` and `/blog/[slug]`, without manual rendering.
  - **Conditional Visibility**: Added a check in `Navbar.tsx` to automatically hide the component on `/admin` paths to avoid overlapping with the Sanity Studio interface.
  - **Z-Index Fix**: Increased the Navbar `z-index` from `z-40` to `z-50` to ensure it stays above the space background and content layers on all routes.
  - **Cleanup**: Removed redundant `Navbar` imports and rendering from `HomeContent.tsx`, `WorkPageClient.tsx`, `work/[slug]/page.tsx`, and `about/page.tsx`.

- **Tags & Skills Restoration (April 2026)**:
  - **Project Detail Page**: Restored the rendering of `skills` and `tags` below the project description in `work/[slug]/page.tsx`.
  - **Featured Project Cards**: Re-implemented `project.tags` mapping in `FeaturedPosts.tsx`.
  - **Work Page Cards**: Updated `WorkPageClient.tsx` to display both `tags` and `skills`.
  - **Visual Consistency**: Standardized tag styling across `FeaturedPosts.tsx` and `MoreWorks.tsx`.
 
- **Project Detail Gallery (April 2026)**:
  - **Schema Update**: Added a `gallery` field (`type: "array", of: [{ type: "image" }]`) to the `project` Sanity schema to support uploading multiple images.
  - **GROQ Update**: Updated `PROJECT_DETAIL_QUERY` in `src/sanity/queries.ts` to fetch the new `gallery` array.
  - **Frontend Layout**: Refactored `src/app/work/[slug]/page.tsx` to render the `gallery` array as a responsive CSS photo grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Maintained backward compatibility by conditionally falling back to the legacy `fullImage` rendering if no gallery is present.

*End of Document. Update this log upon adding new sections, modifying data structures, or altering the core architecture.*
