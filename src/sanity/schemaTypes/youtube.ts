import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const youtube = defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube Video URL",
      description: "Paste the full YouTube URL (e.g. https://www.youtube.com/watch?v=...)",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }).custom((url) => {
          if (!url) return true;
          if (
            url.includes("youtube.com") ||
            url.includes("youtu.be")
          ) {
            return true;
          }
          return "Must be a YouTube URL";
        }),
    }),
  ],
  preview: {
    select: { url: "url" },
    prepare({ url }) {
      return { title: "YouTube Embed", subtitle: url || "No URL set" };
    },
  },
});
