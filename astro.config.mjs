import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), tailwind(), mdx()],
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});