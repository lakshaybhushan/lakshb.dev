import { getCollection, type CollectionEntry } from "astro:content";
import { ImageResponse } from "@vercel/og";
import React from "react";

interface Props {
	params: { slug: string };
	props: { post: CollectionEntry<"thoughts"> };
}

export async function GET({ props }: Props) {
	const { post } = props;

	// Create a React element instead of a plain object
	const html = React.createElement(
		"div",
		{
			tw: "w-full h-full flex items-center justify-center relative px-22",
			style: {
				background: "#FDFFF4",
			},
		},

		React.createElement(
			"div",
			{
				tw: "pl-10 shrink flex",
			},
			React.createElement(
				"div",
				{
					style: {
						fontSize: "48px",
						fontFamily: "Helvetica",
						letterSpacing: "-0.05em",
					},
				},
				post.data.title,
			),
		),
		React.createElement(
			"div",
			{
				tw: "absolute right-[40px] bottom-[40px] flex items-center",
			},
			React.createElement(
				"div",
				{
					tw: "text-[#00997E] text-3xl tracking-tighter",
				},
				"Lakshay Bhushan",
			),
			React.createElement(
				"div",
				{
					tw: "px-2 text-3xl",
					style: {
						fontSize: "30px",
						letterSpacing: "-0.05em",
					},
				},
				"|",
			),
			React.createElement(
				"div",
				{
					tw: "text-3xl tracking-tighter",
				},
				"Thoughts",
			),
		),
	);

	return new ImageResponse(html, {
		width: 1200,
		height: 600,
	});
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
	const blogPosts = await getCollection("thoughts");
	return blogPosts.map((post) => ({
		params: { slug: post.slug },
		props: { post },
	}));
}
