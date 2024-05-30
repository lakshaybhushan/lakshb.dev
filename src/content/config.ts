import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			cover: image(),
			date: z.coerce.date(),
			excerpt: z.string(),
		}),
});

// This key should match your collection directory name in "src/content"
export const collections = {
	thoughts: postsCollection,
};
