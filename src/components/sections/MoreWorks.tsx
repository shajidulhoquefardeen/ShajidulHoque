"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { urlFor } from "@/sanity/client";

interface MoreWorksProps {
  projects: any[];
}

export default function MoreWorks({ projects }: MoreWorksProps) {
  return (
    <SectionWrapper id="more-works" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section header ─── */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            More Works
          </h2>
        </div>

        {/* ─── Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any, i: number) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block relative overflow-hidden rounded-2xl bg-space-navy/50 border border-white/5 hover:border-terminal-yellow/30 transition-all duration-300"
              >
                <div className="relative w-full h-full aspect-video overflow-hidden bg-black/40">
                  {project.image ? (
                    <Image
                      src={urlFor(project.image).width(500).height(280).auto("format").url()}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-white/90 group-hover:text-terminal-yellow transition-colors truncate">
                    {project.title}
                  </h3>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.category && (
                        <span className="px-2 py-0.5 text-[10px] font-mono border border-terminal-yellow text-terminal-yellow bg-terminal-yellow/10 rounded-sm">
                          {project.category}
                        </span>
                      )}
                      {project.tags?.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-mono border border-terminal-yellow/30 text-terminal-yellow/80 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
