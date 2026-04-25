"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePreloader } from "@/hooks/usePreloader";
import spaceImg from "@/../public/assets/space-footer.png";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [hasSeen, setHasSeen] = useState(false);
  const { isLoading, currentGreeting, isExiting } = usePreloader(500);

  useEffect(() => {
    if (sessionStorage.getItem("hasSeenPreloader") === "true") {
      setHasSeen(true);
      onComplete?.();
    }
  }, [onComplete]);

  // Call onComplete when loading finishes
  useEffect(() => {
    if (!isLoading && !isExiting && !hasSeen) {
      onComplete?.();
    }
  }, [isLoading, isExiting, hasSeen, onComplete]);

  if (hasSeen || (!isLoading && !isExiting)) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* ─── Space background ─── */}
          <div className="absolute inset-0">
            <Image
              src={spaceImg}
              alt=""
              fill
              priority
              placeholder="blur"
              className="object-cover"
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-space-black/60" />
          </div>

          {/* ─── Greeting text ─── */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentGreeting}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.12, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-mono select-none will-change-transform"
              >
                {currentGreeting}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* ─── Subtle scan lines effect ─── */}
          <div
            className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
