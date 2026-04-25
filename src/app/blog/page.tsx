import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import { ALL_POSTS_QUERY } from "@/sanity/queries";

export const revalidate = 60;

export const metadata = {
  title: "Blog - Shajidul Hoque",
  description: "Recent thoughts and articles by Shajidul Hoque.",
};

export default async function BlogPage() {
  const posts = await client.fetch(ALL_POSTS_QUERY);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-black selection:bg-terminal-yellow/30 selection:text-white">
      {/* ─── Fixed Background ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/Space.png"
          alt="Space background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-navy/80 via-space-bg/90 to-black/95" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-16 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-montserrat tracking-tight mb-6 flex items-center justify-center sm:justify-start">
              <span className="text-terminal-yellow">/</span>
              <span className="text-white">My Blog</span>
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto sm:mx-0">
              Bringing innovative fashion concepts to life by leading our team with passion and vision. I am proud to be part of the first brand in Bangladesh to introduce reconstructed clothing—blending creativity with sustainability to produce unique, high-quality garments. I oversee the entire creative process, from concept development to final production, ensuring that every piece reflects our brand's commitment to originality and craftsmanship. My role also involves direct communication with garment suppliers to secure the right materials for our designs
            </p>
          </div>

          {/* Blog List */}
          <div className="space-y-6">
            {posts.map((post: any) => {
              const formattedDate = post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })
                : "";

              return (
                <Link 
                  key={post._id} 
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-4 px-4 sm:px-6 rounded-3xl sm:rounded-full border border-terminal-yellow/30 hover:border-terminal-yellow hover:bg-terminal-yellow/5 transition-all duration-300">
                    
                    {/* Thumbnail */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-space-navy relative">
                        {post.thumbnailImage ? (
                          <Image
                            src={urlFor(post.thumbnailImage).width(128).height(128).auto("format").url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg text-white/90 font-medium group-hover:text-white transition-colors line-clamp-2 sm:line-clamp-1">
                        {post.title}
                      </h2>
                    </div>

                    {/* Meta (Read Time & Date) */}
                    <div className="shrink-0 flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-white/60">
                      <span className="whitespace-nowrap">{post.readTime}</span>
                      <span className="text-terminal-yellow/80 whitespace-nowrap">{formattedDate}</span>
                    </div>
                    
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
