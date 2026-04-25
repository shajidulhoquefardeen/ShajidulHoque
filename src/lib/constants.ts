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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shajidul-hoque-fardeen?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "LinkedinLogo" },
  { label: "Instagram", href: "https://www.instagram.com/sajidfardeen?igsh=Z3N0eTJtaDRveWQ5", icon: "InstagramLogo" },
  { label: "Facebook", href: "https://www.facebook.com/hellotheresajidfardeen", icon: "FacebookLogo" },
  { label: "X", href: "https://x.com/SajidFardeen", icon: "XLogo" },
  { label: "GitHub", href: "https://github.com/shajidulhoquefardeen", icon: "GithubLogo" },
] as const;

// ──────────────────────────────────────────────
// Contact info
// ──────────────────────────────────────────────
export const CONTACT_INFO = {
  email: "Shajidulhoquefardeen@gmail.com",
  phone: "+8801647465507",
  responseTime: "Within 24 hours",
} as const;
