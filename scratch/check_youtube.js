const { createClient } = require("next-sanity");
require("dotenv").config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-04-25",
  useCdn: true,
});

const query = `*[_type == "project" && slug.current == $slug][0] {
    youtubeUrl
}`;

client.fetch(query, { slug: "Transcom Beverages Limited (PepsiCo)" }).then(res => {
  console.log(JSON.stringify(res, null, 2));
}).catch(err => {
  console.error(err);
});
