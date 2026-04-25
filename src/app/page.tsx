import { client } from "@/sanity/client";
import {
  FEATURED_PROJECTS_QUERY,
  MORE_WORKS_QUERY,
  RECENT_POSTS_QUERY,
} from "@/sanity/queries";
import HomeContent from "@/components/HomeContent";

export default async function Home() {
  let featuredProjects = [];
  let moreWorks = [];
  let recentPosts = [];

  try {
    [featuredProjects, moreWorks, recentPosts] = await Promise.all([
      client.fetch(FEATURED_PROJECTS_QUERY),
      client.fetch(MORE_WORKS_QUERY),
      client.fetch(RECENT_POSTS_QUERY),
    ]);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
  }

  return (
    <HomeContent
      featuredProjects={featuredProjects || []}
      moreWorks={moreWorks || []}
      recentPosts={recentPosts || []}
    />
  );
}
