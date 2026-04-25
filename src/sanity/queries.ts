// ──────────────────────────────────────────────
// GROQ Queries for Sanity CMS
// ──────────────────────────────────────────────

// ── Homepage: Featured Projects (top 3) ──
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(order asc) [0...3] {
    _id,
    title,
    shortTitle,
    "slug": slug.current,
    description,
    image,
    tags,
    "href": "/work/" + slug.current
  }
`;

// ── Homepage: More Works (non-featured, up to 6) ──
export const MORE_WORKS_QUERY = `
  *[_type == "project" && featured != true] | order(order asc) [0...6] {
    _id,
    title,
    shortTitle,
    "slug": slug.current,
    description,
    image,
    tags,
    category,
    "href": "/work/" + slug.current
  }
`;

// ── Homepage: Recent blog posts ──
export const RECENT_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) [0...5] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    "date": publishedAt,
    thumbnailImage
  }
`;

// ── /work page: All projects ──
export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    shortTitle,
    "slug": slug.current,
    description,
    image,
    tags,
    skills,
    category,
    featured,
    "href": "/work/" + slug.current
  }
`;

// ── /work/[slug]: Single project detail ──
export const PROJECT_DETAIL_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    shortTitle,
    "slug": slug.current,
    fullDescription,
    image,
    fullImage,
    gallery,
    youtubeUrl,
    tags,
    skills,
    category
  }
`;

// ── /blog page: All posts ──
export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    "date": publishedAt,
    thumbnailImage
  }
`;

// ── /blog/[slug]: Single post with full body ──
export const POST_DETAIL_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    "date": publishedAt,
    featuredImage,
    thumbnailImage,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
`;
