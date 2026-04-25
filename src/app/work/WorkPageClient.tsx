"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import spaceBg from "@/../public/assets/Space.png";
import { urlFor } from "@/sanity/client";

type Category = "All" | "Dev" | "UI/UX" | "Design" | "Rest in PPTs";

const CATEGORIES: Category[] = ["All", "Dev", "UI/UX", "Design", "Rest in PPTs"];

interface WorkPageClientProps {
  projects: any[];
}

export default function WorkPageClient({ projects }: WorkPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = projects.filter(
    (project: any) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <>
      <Navbar />

      {/* ─── Persistent space background (fixed to viewport) ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src={spaceBg}
          alt="Space Background"
          fill
          placeholder="blur"
          className="object-cover object-center"
          sizes="100vw"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-space-black/80" />
      </div>

      <main className="relative z-10 flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            <span className="text-terminal-yellow">/</span>Work
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            I often play around with ideas using Vibecode, Illustrator, Figma, my
            notebook, and listening to songs. Sometimes, the results end up here.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                  isActive
                    ? "text-terminal-yellow bg-terminal-yellow/10 border border-terminal-yellow/30"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {isActive && <span className="mr-2">&gt;<span className="inline-block translate-y-[2px]">_</span></span>}
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredProjects.map((project: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                key={project._id}
                className="break-inside-avoid"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex flex-col group hover:border-terminal-yellow/30 transition-colors block"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-full aspect-video overflow-hidden bg-black/40">
                    {project.image ? (
                      <Image
                        src={urlFor(project.image).width(600).height(340).auto("format").url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-terminal-yellow transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Skill Pills */}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {project.skills?.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs rounded-full border border-white/10 text-white/70 bg-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
