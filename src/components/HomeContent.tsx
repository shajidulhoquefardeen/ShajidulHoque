"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/sections/Preloader";
import Hero from "@/components/sections/Hero";
import FeaturedPosts from "@/components/sections/FeaturedPosts";
import MoreWorks from "@/components/sections/MoreWorks";
import RecentThoughts from "@/components/sections/RecentThoughts";
import FAQ from "@/components/sections/FAQ";
import SayHi from "@/components/sections/SayHi";
import spaceFooterImg from "@/../public/assets/space-footer.png";

interface HomeContentProps {
  featuredProjects: any[];
  moreWorks: any[];
  recentPosts: any[];
}

export default function HomeContent({
  featuredProjects,
  moreWorks,
  recentPosts,
}: HomeContentProps) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <>
      {/* Preloader — covers everything, auto-dismisses */}
      <Preloader onComplete={() => setIsPreloaderComplete(true)} />

      {/* ─── Persistent space background (fixed to viewport) ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src={spaceFooterImg}
          alt=""
          fill
          placeholder="blur"
          className="object-cover"
          sizes="100vw"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-space-black/80" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1">
        {/* Hero — full viewport landing */}
        <Hero isPreloaderComplete={isPreloaderComplete} />

        {/* Scroll sections over the fixed background */}
        <div className="relative">
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-2 border-terminal-yellow/30 border-t-terminal-yellow rounded-full animate-spin" /></div>}>
            <FeaturedPosts projects={featuredProjects} />
          </Suspense>
          
          <Suspense fallback={<div className="h-96" />}>
            <MoreWorks projects={moreWorks} />
          </Suspense>
          
          <Suspense fallback={<div className="h-64" />}>
            <RecentThoughts posts={recentPosts} />
          </Suspense>
          
          <FAQ />
          <SayHi />
        </div>
      </main>

      {/* Footer with Mux video */}
      <Footer />
    </>
  );
}
