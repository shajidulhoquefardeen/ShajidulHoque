import { defineType, defineField } from "sanity";
import { ProjectsIcon } from "@sanity/icons";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "shortTitle",
      title: "Short Title",
      type: "string",
      description: "Abbreviated title for cards (e.g. ATW, TCE)",
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Dev", value: "Dev" },
          { title: "UI/UX", value: "UI/UX" },
          { title: "Design", value: "Design" },
          { title: "Rest in PPTs", value: "Rest in PPTs" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this project in the Featured Posts section on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Card excerpt shown in project grids",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      rows: 6,
      description: "Detailed description shown on the project detail page",
    }),
    defineField({
      name: "image",
      title: "Card Thumbnail",
      type: "image",
      description: "Image shown on project cards. Crop/hotspot available for grid display.",
      options: { hotspot: true },
    }),
    defineField({
      name: "fullImage",
      title: "Full Image (Uncropped)",
      type: "image",
      description: "Full-resolution image for the project detail page. Will NOT be cropped.",
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [{ type: "image" }],
      description: "Upload multiple images here to form a responsive photo grid on the project detail page.",
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "YouTube embed URL for the project detail page",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).custom((url) => {
          if (!url) return true;
          if (url.includes("youtube.com") || url.includes("youtu.be")) return true;
          return "Must be a YouTube URL";
        }),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Technology or category tags (e.g. Next.js, Firebase)",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Skill pills shown on project cards",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first. Used for manual ordering.",
      initialValue: 0,
      hidden: false,
    }),
  ],
  orderings: [
    {
      title: "Manual Order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
