"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { urlFor } from "@/sanity/client";

interface RecentThoughtsProps {
  posts: any[];
}

export default function RecentThoughts({ posts }: RecentThoughtsProps) {
  return (
    <SectionWrapper id="blog" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section header ─── */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            Recent Thoughts
          </h2>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-mono text-terminal-yellow hover:gap-2.5 transition-all duration-200 group"
          >
            <span className="text-white/50 group-hover:text-terminal-yellow transition-colors">
              ~
            </span>
            View All
          </Link>
        </div>

        {/* ─── Blog post list ─── */}
        <div className="space-y-4">
          {posts.map((post: any, i: number) => {
            // Format the date from Sanity datetime
            const formattedDate = post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })
              : "";

            return (
              <Link href={`/blog/${post.slug}`} key={post._id} passHref legacyBehavior>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="group flex items-center gap-4 sm:gap-6 py-5 px-5 sm:px-6 rounded-2xl border border-space-border-highlight/30 hover:border-terminal-yellow/50 bg-transparent hover:bg-white/[0.02] transition-all duration-300"
                >
                  {/* Thumbnail circle */}
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-space-navy border border-white/10 overflow-hidden flex items-center justify-center relative">
                    {post.thumbnailImage ? (
                      <Image
                        src={urlFor(post.thumbnailImage).width(112).height(112).auto("format").url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <span className="text-xs text-white/30 font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Post info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base text-white/90 font-medium truncate group-hover:text-white transition-colors">
                      {post.title}
                    </h3>
                  </div>

                  {/* Read time */}
                  <span className="hidden sm:block text-xs font-mono text-white/40 whitespace-nowrap">
                    {post.readTime}
                  </span>

                  {/* Date */}
                  <span className="text-xs font-mono text-terminal-yellow/70 whitespace-nowrap">
                    {formattedDate}
                  </span>

                  {/* Arrow */}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="shrink-0 text-white/20 group-hover:text-terminal-yellow group-hover:translate-x-1 transition-all duration-200"
                  />
                </motion.a>
              </Link>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
