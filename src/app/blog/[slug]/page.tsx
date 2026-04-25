import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import { POST_DETAIL_QUERY } from "@/sanity/queries";
import PortableTextRenderer from "@/components/shared/PortableTextRenderer";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_DETAIL_QUERY, { slug });

  if (!post) {
    notFound();
  }

  // Format the date
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : "";

  // Build uncropped featured image URL
  const featuredImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).fit("max").auto("format").url()
    : null;

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
        <div className="absolute inset-0 bg-gradient-to-b from-space-navy/80 via-space-bg/90 to-black/95" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-12">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-mono text-white/70 hover:text-white transition-colors group"
            >
              <ArrowLeft size={16} weight="bold" className="text-terminal-yellow group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat tracking-tight text-white leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-4 text-sm font-mono text-white/50 justify-center sm:justify-start">
              <span>{formattedDate}</span>
              <span className="w-1 h-1 rounded-full bg-terminal-yellow/50"></span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          {featuredImageUrl && (
            <div className="mb-12">
              <Image
                src={featuredImageUrl}
                alt={post.title}
                width={1200}
                height={800}
                sizes="100vw"
                className="w-full h-auto max-w-3xl mx-auto rounded-lg border border-white/5 shadow-2xl shadow-black/50"
                priority
              />
            </div>
          )}

          {/* Article Content — Portable Text */}
          <article className="max-w-3xl mx-auto">
            {post.body && <PortableTextRenderer value={post.body} />}
          </article>

        </div>
      </div>

      <Footer />
    </main>
  );
}
