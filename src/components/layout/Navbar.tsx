"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide Navbar on /admin routes (Sanity Studio)
  if (pathname?.startsWith("/admin")) return null;

  // Track scroll position for navbar background
  useEffect(() => {
    // Reset scrolled state on route change
    setIsScrolled(window.scrollY > 50);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Track active section via IntersectionObserver (only on home page)
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = NAV_LINKS
      .filter(link => link.href.includes("#"))
      .map((link) => link.href.split("#")[1]);
      
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(element);
      observers.push(observer);
    });

    // Special case for hero if at top
    const handleHeroScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("/");
      }
    };
    window.addEventListener("scroll", handleHeroScroll);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("scroll", handleHeroScroll);
    };
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileOpen(false);
    
    // If it's a hash link on the current page, handle smooth scroll
    if (href.includes("#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(`#${targetId}`);
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-space-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* ─── Desktop nav ─── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isAbout = link.href === "/about";
              const isHome = link.href === "/";
              
              let isActive = false;
              if (isAbout) {
                isActive = pathname === "/about";
              } else if (isHome) {
                isActive = pathname === "/" && (activeSection === "/" || activeSection === "#hero" || activeSection === "");
              } else if (link.href.includes("#")) {
                const hash = link.href.split("#")[1];
                isActive = pathname === "/" && activeSection === `#${hash}`;
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e as any, link.href)}
                    className={`relative px-4 py-2 font-mono text-base font-bold tracking-wide transition-colors duration-200 rounded-md no-underline group ${
                      isActive
                        ? "text-terminal-yellow"
                        : "text-white/80 hover:text-terminal-yellow"
                    }`}
                  >
                    {/* Terminal prefix >_ (only for active) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: -8, width: 0 }}
                          animate={{ opacity: 1, x: 0, width: "auto" }}
                          exit={{ opacity: 0, x: -8, width: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="inline-block text-terminal-yellow font-mono mr-0.5 overflow-hidden"
                        >
                          &gt;<span className="inline-block translate-y-[3px]">_</span>
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ─── Mobile hamburger ─── */}
          <div className="md:hidden flex items-center justify-between w-full">
            <span className="font-mono text-terminal-yellow text-sm font-bold">
              &gt;<span className="inline-block translate-y-[3px]">_</span>SH
            </span>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                  className="relative w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col gap-1.5 w-5">
                    <motion.span
                      animate={
                        mobileOpen
                          ? { rotate: 45, y: 7 }
                          : { rotate: 0, y: 0 }
                      }
                      className="block h-[2px] w-full bg-white rounded-full origin-center"
                      transition={{ duration: 0.25 }}
                    />
                    <motion.span
                      animate={
                        mobileOpen ? { opacity: 0 } : { opacity: 1 }
                      }
                      className="block h-[2px] w-full bg-white rounded-full"
                      transition={{ duration: 0.15 }}
                    />
                    <motion.span
                      animate={
                        mobileOpen
                          ? { rotate: -45, y: -7 }
                          : { rotate: 0, y: 0 }
                      }
                      className="block h-[2px] w-full bg-white rounded-full origin-center"
                      transition={{ duration: 0.25 }}
                    />
                  </div>
                </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-space-deep/95 backdrop-blur-2xl border-l border-space-border w-[280px] sm:w-[340px] p-0"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col pt-20 px-6">
                  <motion.ul
                    initial="closed"
                    animate="open"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.06 },
                      },
                      closed: {},
                    }}
                    className="space-y-2"
                  >
                    {NAV_LINKS.map((link) => {
                      const isAbout = link.href === "/about";
                      const isHome = link.href === "/";
                      
                      let isActive = false;
                      if (isAbout) {
                        isActive = pathname === "/about";
                      } else if (isHome) {
                        isActive = pathname === "/" && (activeSection === "/" || activeSection === "#hero" || activeSection === "");
                      } else if (link.href.includes("#")) {
                        const hash = link.href.split("#")[1];
                        isActive = pathname === "/" && activeSection === `#${hash}`;
                      }

                      return (
                        <motion.li
                          key={link.href}
                          variants={{
                            open: { opacity: 1, x: 0 },
                            closed: { opacity: 0, x: 30 },
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <Link
                            href={link.href}
                            onClick={(e) => handleNavClick(e as any, link.href)}
                            className={`block py-3 px-4 rounded-lg font-mono text-lg transition-all duration-200 ${
                              isActive
                                ? "text-terminal-yellow bg-terminal-yellow/10"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <span
                              className={`mr-2 ${
                                isActive
                                  ? "text-terminal-yellow"
                                  : "text-white/30"
                                }`}
                            >
                              &gt;<span className="inline-block translate-y-[3px]">_</span>
                            </span>
                            {link.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  {/* Status indicator */}
                  <div className="mt-auto pt-12 pb-8 px-4">
                    <div className="flex items-center gap-2 text-sm text-space-muted">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terminal-green"></span>
                      </span>
                      Available for projects
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
