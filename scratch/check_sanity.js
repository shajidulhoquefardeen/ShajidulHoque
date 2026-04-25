const { createClient } = require("next-sanity");
require("dotenv").config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-04-25",
  useCdn: true,
});

const query = `*[_type == "project"] {
  _id,
  title,
  "slug": slug.current,
  "href": "/work/" + slug.current
}`;

client.fetch(query).then(projects => {
  console.log(JSON.stringify(projects, null, 2));
}).catch(err => {
  console.error(err);
});
