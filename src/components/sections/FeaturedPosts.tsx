"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { urlFor } from "@/sanity/client";

interface FeaturedPostsProps {
  projects: any[];
}

export default function FeaturedPosts({ projects }: FeaturedPostsProps) {
  return (
    <SectionWrapper id="work" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section header ─── */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            Featured Post
          </h2>
          <Link
            href="/work"
            className="hidden sm:flex items-center gap-1.5 text-sm font-mono text-terminal-yellow hover:gap-2.5 transition-all duration-200 group"
          >
            <span className="text-white/50 group-hover:text-terminal-yellow transition-colors">
              →
            </span>
            View All
          </Link>
        </div>

        {/* ─── Project cards grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project: any, i: number) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="block h-full group"
              >
                <Card className="group glass-card glass-card-hover rounded-2xl overflow-hidden border-space-border-highlight/30 hover:border-terminal-yellow/50 transition-all duration-300 h-full bg-transparent">
                  {/* Thumbnail */}
                  <div className="relative w-full h-full aspect-[16/10] overflow-hidden bg-space-navy">
                    {project.image ? (
                      <Image
                        src={urlFor(project.image).width(600).height(375).auto("format").url()}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-mono font-bold text-white/50 uppercase tracking-[0.3em]">
                          {project.title}
                        </span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-terminal-yellow/0 group-hover:bg-terminal-yellow/5 transition-colors duration-300" />
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-mono font-bold text-terminal-yellow text-sm uppercase tracking-wider">
                      {project.shortTitle}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-4">
                      {project.description}
                    </p>
 
                    {/* Project Tags */}
                    {project.tags && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-[10px] font-mono border border-terminal-yellow/30 text-terminal-yellow/80 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read more link */}
                    <div className="pt-2">
                      <div
                        className="inline-flex items-center gap-1 text-xs font-mono text-terminal-yellow/70 group-hover:text-terminal-yellow group-hover:gap-2 transition-all duration-200"
                      >
                        View Project
                        <ArrowRight size={12} weight="bold" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
