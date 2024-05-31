import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	integrations: [
		react(),
		tailwind(),
		mdx({
			syntaxHighlight: false,
			rehypePlugins: [
				rehypeSlug,
				[
					rehypePrettyCode,
					{
						theme: "houston",
					},
				],
			],
		}),
	],
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
