import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

/**
 * Extracts a YouTube embed URL from various YouTube link formats.
 */
function getYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    let videoId = "";

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.searchParams.has("v")) {
      videoId = parsed.searchParams.get("v")!;
    } else if (parsed.pathname.includes("/embed/")) {
      videoId = parsed.pathname.split("/embed/")[1];
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : url;
  } catch {
    return url;
  }
}

/**
 * Custom Portable Text component map that matches the portfolio's
 * space-themed prose styling.
 */
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const imageUrl = urlFor(value)
        .width(1200)
        .fit("max")
        .auto("format")
        .url();

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Blog image"}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full h-auto rounded-lg border border-white/5 shadow-xl"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-white/40 font-mono">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    youtube: ({ value }) => {
      if (!value?.url) return null;

      const embedUrl = getYouTubeEmbedUrl(value.url);

      return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/20 backdrop-blur-sm my-8">
          <iframe
            src={embedUrl}
            title="YouTube Video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-terminal-yellow hover:text-terminal-yellow/80 transition-colors underline underline-offset-4"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-white/10 text-terminal-yellow font-mono text-sm">
        {children}
      </code>
    ),
  },

  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-white/90 mt-10 mb-4 font-montserrat">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-white/90 mt-8 mb-4 font-montserrat">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-white/85 mt-6 mb-3 font-montserrat">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-white/70 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-terminal-yellow/50 pl-4 my-6 text-white/60 italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-white/70 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 text-white/70 my-4">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="text-white/70">{children}</li>,
    number: ({ children }) => <li className="text-white/70">{children}</li>,
  },
};

interface PortableTextRendererProps {
  value: any[];
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
