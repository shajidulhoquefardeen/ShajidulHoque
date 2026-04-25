import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import spaceBg from "@/../public/assets/Space.png";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import { PROJECT_DETAIL_QUERY } from "@/sanity/queries";

function getYouTubeEmbedUrl(url: string) {
  if (!url) return null;
  const trimmedUrl = url.trim();
  
  // If it's already an embed URL, just return it trimmed
  if (trimmedUrl.includes("youtube.com/embed/")) {
    return trimmedUrl;
  }

  let videoId = "";
  if (trimmedUrl.includes("youtu.be/")) {
    videoId = trimmedUrl.split("youtu.be/")[1].split("?")[0];
  } else if (trimmedUrl.includes("v=")) {
    videoId = trimmedUrl.split("v=")[1].split("&")[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
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
        {/* ─── Header Section ─── */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            <span className="text-terminal-yellow">/</span>{project.title}
          </h1>
        </div>

        {/* ─── Description Section ─── */}
        <div className="max-w-4xl mx-auto mb-20">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed text-center font-medium">
            {project.fullDescription}
          </p>
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
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
