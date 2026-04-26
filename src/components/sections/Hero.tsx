"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChatCircleDots,
  FolderOpen,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  GithubLogo,
  XLogo,
} from "@phosphor-icons/react";
import RotatingText from "@/components/shared/RotatingText";
import { ROTATING_ROLES } from "@/lib/constants";
import heroImg from "@/../public/assets/newbg.png";

interface HeroProps {
  isPreloaderComplete: boolean;
}

export default function Hero({ isPreloaderComplete }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-space-black">
      {/* ─── Background image ─── */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src={heroImg}
          alt="Space themed hero background — a man looking up at the sky with galaxies emerging"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-bottom opacity-50"
          quality={90}
        />
        {/* Overlays removed per user request to restore image sharpness */}
      </div>

      {/* ─── Hero content ─── */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col justify-start pt-[20vh] md:justify-end md:pt-0">
        
        {/* Make sure this container spans the full width and uses flex-row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isPreloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 px-4 sm:px-10 pb-16 sm:pb-10"
        >
          
          {/* LEFT SIDE: Name and Titles */}
          <div className="flex flex-col text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1]">
              Shajidul Hoque
            </h1>
            <div className="text-xl sm:text-2xl flex flex-col items-start gap-1 mt-2">
              {/* Line 2 */}
              <div className="flex items-baseline gap-2">
                <span className="text-white/90">A</span>
                <span className="text-terminal-yellow font-mono text-2xl sm:text-3xl">↘</span>
              </div>
              
              {/* Line 3 */}
              <div className="text-terminal-yellow font-bold text-2xl sm:text-3xl">
                <RotatingText words={ROTATING_ROLES} intervalMs={2500} className="text-terminal-yellow" />
              </div>
              
              {/* Line 4 */}
              <p className="text-white/90 font-medium text-lg sm:text-xl mt-1">Lost in Space</p>
            </div>
          </div>

          {/* RIGHT SIDE: Buttons */}
          <div className="flex items-center mt-2 md:mt-0">
            
            {/* Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => handleScrollTo("contact")}
                className="flex items-center gap-1.5 border border-terminal-yellow text-terminal-yellow px-4 py-1.5 rounded-full hover:bg-terminal-yellow hover:text-space-black transition-all duration-200 text-xs font-medium bg-space-black/30 backdrop-blur-sm"
              >
                <ChatCircleDots size={14} weight="regular" />
                Contact Me
              </button>
              <button 
                onClick={() => handleScrollTo("work")}
                className="flex items-center gap-1.5 border border-white/40 text-white px-4 py-1.5 rounded-full hover:bg-white/10 hover:border-white transition-all duration-200 text-xs font-medium bg-space-black/30 backdrop-blur-sm"
              >
                <FolderOpen size={14} weight="regular" />
                View Projects
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}

