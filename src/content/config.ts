import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			excerpt: z.string(),
			cover: image().refine((img)=>img.width >= 400, { message: "Cover image must be at least 400px wide" }),
		}),
});

// This key should match your collection directory name in "src/content"
export const collections = {
	thoughts: postsCollection,
};
