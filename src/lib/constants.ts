// ──────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Say Hi", href: "/#contact" },
] as const;

// ──────────────────────────────────────────────
// Preloader greetings
// ──────────────────────────────────────────────
export const GREETINGS = [
  "হ্যালো",
  "Hello",
  "Bonjour",
  "Olá",
  "السلام عليكم",
] as const;

// ──────────────────────────────────────────────
// Hero rotating roles
// ──────────────────────────────────────────────
export const ROTATING_ROLES = ["Designer", "Researcher", "Developer"] as const;

// ──────────────────────────────────────────────
// Social links
// ──────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/shajidul", icon: "LinkedinLogo" },
  { label: "Instagram", href: "https://instagram.com/shajidul", icon: "InstagramLogo" },
  { label: "Facebook", href: "https://facebook.com/shajidul", icon: "FacebookLogo" },
  { label: "X", href: "https://x.com/shajidul", icon: "XLogo" },
  { label: "GitHub", href: "https://github.com/shajidul", icon: "GithubLogo" },
] as const;

// ──────────────────────────────────────────────
// Contact info
// ──────────────────────────────────────────────
export const CONTACT_INFO = {
  email: "shajidulhoquefinden@gmail.com",
  phone: "+8801847491097",
  responseTime: "Within 24 hours",
} as const;
