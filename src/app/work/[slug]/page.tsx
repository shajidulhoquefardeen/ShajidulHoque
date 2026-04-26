import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import spaceBg from "@/../public/assets/Space.png";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import { PROJECT_DETAIL_QUERY } from "@/sanity/queries";

function getYouTubeEmbedUrl(url: string | undefined | null) {
  if (!url) return null;
  const trimmedUrl = url.trim();
  
  let videoId = "";
  
  // Handle youtube.com/watch?v=ID or &v=ID
  if (trimmedUrl.includes("v=")) {
    videoId = trimmedUrl.split("v=")[1].split("&")[0];
  } 
  // Handle youtu.be/ID
  else if (trimmedUrl.includes("youtu.be/")) {
    videoId = trimmedUrl.split("youtu.be/")[1].split("?")[0];
  } 
  // Handle youtube.com/embed/ID
  else if (trimmedUrl.includes("youtube.com/embed/")) {
    videoId = trimmedUrl.split("youtube.com/embed/")[1].split("?")[0];
  }

  if (!videoId) return null;

  // Exact format: autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0`;
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const project = await client.fetch(PROJECT_DETAIL_QUERY, { slug });

  if (!project) {
    notFound();
  }

  // Build uncropped image URL
  const fullImageUrl = project.fullImage
    ? urlFor(project.fullImage).width(1400).fit("max").auto("format").url()
    : null;

  const youtubeEmbedUrl = getYouTubeEmbedUrl(project.youtubeUrl);

  return (
    <>
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

      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        {/* ─── Content Wrapper (Equalized Widths) ─── */}
        <div className="max-w-5xl w-full">
          {/* ─── Header Section ─── */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-left">
              <span className="text-terminal-yellow">/</span>{project.title}
            </h1>
          </div>

          {/* ─── Description Section ─── */}
          <div className="mb-20">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed text-left font-medium">
              {project.fullDescription}
            </p>
   
            {/* Skills & Tags */}
            {(project.skills || project.tags || project.category) && (
              <div className="mt-8 flex flex-wrap justify-start gap-2">
                {/* Category as primary tag */}
                {project.category && (
                  <span className="inline-block border border-terminal-yellow text-terminal-yellow text-sm px-3 py-1 rounded-sm bg-terminal-yellow/10 font-mono">
                    {project.category}
                  </span>
                )}
                {project.skills?.map((skill: string, index: number) => (
                  <span
                    key={`skill-${index}`}
                    className="inline-block border border-terminal-yellow/30 text-terminal-yellow text-sm px-3 py-1 rounded-sm bg-terminal-yellow/5 font-mono"
                  >
                    {skill}
                  </span>
                ))}
                {project.tags?.map((tag: string, index: number) => (
                  <span
                    key={`tag-${index}`}
                    className="inline-block border border-white/20 text-white/70 text-sm px-3 py-1 rounded-sm bg-white/5 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── Media Container ─── */}
        <div className="max-w-5xl mx-auto space-y-16">
          {/* YouTube Video */}
          {youtubeEmbedUrl && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/20 backdrop-blur-sm">
              <iframe
                src={youtubeEmbedUrl}
                title={`${project.title} Video Presentation`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}

          {/* Project Gallery (Grid) */}
          {project.gallery && project.gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
              {project.gallery.map((img: any, index: number) => {
                const imgUrl = urlFor(img).width(1400).fit("max").auto("format").url();
                return (
                  <div key={index} className="w-full rounded-lg overflow-hidden border border-white/5 shadow-2xl bg-black/20 backdrop-blur-sm">
                    <Image
                      src={imgUrl}
                      alt={`${project.title} Gallery Image ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto object-contain rounded-lg"
                      priority={index < 3}
                    />
                  </div>
                );
              })}
            </div>
          ) : fullImageUrl ? (
            <div className="w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/20 backdrop-blur-sm mt-12">
              <Image
                src={fullImageUrl}
                alt={`${project.title} Full Preview`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
}
