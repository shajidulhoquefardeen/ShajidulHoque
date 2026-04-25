import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-04-25",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

/**
 * Generate an optimised, uncropped image URL from a Sanity image asset.
 * Defaults to fit("max") so images are never cropped.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
