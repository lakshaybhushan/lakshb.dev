import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import mdx from "@astrojs/mdx";
import lenis from "astro-lenis";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [react(), tailwind(), mdx({
    syntaxHighlight: false,
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, {
      theme: "houston"
    }]]
  }), lenis(), sitemap()],
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});