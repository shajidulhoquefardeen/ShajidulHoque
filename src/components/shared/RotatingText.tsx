"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  words: readonly string[];
  intervalMs?: number;
  className?: string;
}

export default function RotatingText({
  words,
  intervalMs = 2500,
  className = "",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [words.length, intervalMs]);

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ verticalAlign: "bottom" }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-block text-terminal-yellow"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
