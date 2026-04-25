"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  XLogo,
  GithubLogo,
} from "@phosphor-icons/react";
import MuxVideoPlayer from "@/components/shared/MuxVideoPlayer";
import spaceFooterImg from "@/../public/assets/space-footer.png";

const MUX_PLAYBACK_ID = "Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g";

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>> = {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  XLogo,
  GithubLogo,
};

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/shajidul", icon: "LinkedinLogo" },
  { label: "Instagram", href: "https://instagram.com/shajidul", icon: "InstagramLogo" },
  { label: "Facebook", href: "https://facebook.com/shajidul", icon: "FacebookLogo" },
  { label: "X", href: "https://x.com/shajidul", icon: "XLogo" },
  { label: "GitHub", href: "https://github.com/shajidul", icon: "GithubLogo" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* ─── Space background image (fallback behind video) ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={spaceFooterImg}
          alt=""
          fill
          placeholder="blur"
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-space-black/40" />
      </div>

      {/* ─── Mux video layer (lazy-loaded, plays over space image) ─── */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 rotate-180">
          <MuxVideoPlayer playbackId={MUX_PLAYBACK_ID} />
        </div>
        {/* Gradient overlay so text is readable over the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-black/70 via-space-black/30 to-space-black/60" />
      </div>

      {/* ─── Footer content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section — tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="pt-12 pb-8 md:pt-16 md:pb-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-semibold text-white tracking-tight">
            <span className="text-terminal-yellow">&gt;<span className="inline-block translate-y-[0.1em]">_</span></span>Floating ideas
            into existence
          </h2>
        </motion.div>

        {/* Bottom section — links + status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-white/10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Social links */}
          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Social media links">
            {SOCIAL_LINKS.map((link) => {
              const IconComponent = SOCIAL_ICON_MAP[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200 text-sm font-mono flex items-center gap-1.5 group"
                  aria-label={link.label}
                >
                  {IconComponent && (
                    <IconComponent size={16} weight="regular" />
                  )}
                  <span className="hidden sm:inline group-hover:text-terminal-yellow transition-colors">
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Available for projects status */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-terminal-green/30 bg-terminal-green/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal-green"></span>
            </span>
            <span className="text-sm font-mono text-terminal-green">
              Available for projects
            </span>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="py-4 text-center">
          <p className="text-xs text-white/30 font-mono">
            © {new Date().getFullYear()} Shajidul Hoque. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
