import { client } from "@/sanity/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/queries";
import WorkPageClient from "./WorkPageClient";

export const metadata = {
  title: "Work - Shajidul Hoque",
  description: "Projects and work by Shajidul Hoque.",
};

export default async function WorkPage() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return <WorkPageClient projects={projects} />;
}
