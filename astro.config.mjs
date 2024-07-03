import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [react(), tailwind(), mdx({
    syntaxHighlight: false,
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, {
      theme: "houston"
    }]]
  }), sitemap()],
  site: "https://lakshb.dev",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    includeFiles: ["./public/fonts/Satoshi-Medium.ttf", "./public/fonts/Satoshi-Bold.ttf"]
  })
});