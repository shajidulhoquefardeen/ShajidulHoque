"use client";

import { useState, useEffect, useCallback } from "react";
import { GREETINGS } from "@/lib/constants";

interface UsePreloaderReturn {
  isLoading: boolean;
  currentGreeting: string;
  currentIndex: number;
  isExiting: boolean;
}

export function usePreloader(wordDurationMs = 350): UsePreloaderReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hasSeenPreloader") === "true") {
      setIsLoading(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isExiting) return;
    if (sessionStorage.getItem("hasSeenPreloader") === "true") return;

    // If we've reached the end of the array
    if (currentIndex === GREETINGS.length - 1) {
      // Hold the last greeting for 1200ms
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
        // Trigger exit by setting loading to false
        setIsLoading(false);
        sessionStorage.setItem("hasSeenPreloader", "true");
        
        // After exit animation duration (matching Preloader.tsx + buffer), clean up
        setTimeout(() => setIsExiting(false), 1200);
      }, 1200);
      return () => clearTimeout(exitTimeout);
    }

    // Otherwise, cycle to next word after wordDurationMs
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, wordDurationMs);

    return () => clearTimeout(timer);
  }, [currentIndex, wordDurationMs]);

  // Lock body scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return {
    isLoading,
    currentGreeting: GREETINGS[currentIndex],
    currentIndex,
    isExiting,
  };
}
