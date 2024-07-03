import { getCollection, type CollectionEntry } from "astro:content";
import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import React from "react";

interface Props {
	params: { slug: string };
	props: { post: CollectionEntry<"lab"> };
}

export async function GET({ props }: Props) {
	const { post } = props;

	const SatoshiBold = fs.readFileSync(
		path.resolve(process.cwd(), "./public/fonts/Satoshi-Bold.ttf"),
	);
	const SatoshiMedium = fs.readFileSync(
		path.resolve(process.cwd(), "./public/fonts/Satoshi-Medium.ttf"),
	);

	const html = React.createElement(
		"div",
		{
			tw: "w-full h-full flex items-center justify-center relative px-22",
			style: {
				background: "#FDFFF4",
				fontFamily: "Satoshi",
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
						color: "#535353",
						letterSpacing: "-0.05em",
						fontFamily: "Satoshi-Bold",
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
					style: {
						fontFamily: "Satoshi-Medium",
					},
				},
				"Lakshay Bhushan",
			),
			React.createElement(
				"div",
				{
					tw: "px-2 text-3xl text-[#00997E]",
					style: {
						fontSize: "30px",
                        fontFamily: "Satoshi-Bold",
						letterSpacing: "-0.05em",
					},
				},
				"|",
			),
			React.createElement(
				"div",
				{
					tw: "text-3xl tracking-tighter text-[#00997E]",
				},
				"Lab",
			),
		),
	);

	return new ImageResponse(html, {
		width: 1200,
		height: 600,
		fonts: [
			{
				name: "Satosh-Medium",
				data: SatoshiMedium.buffer,
			},
			{
				name: "Satoshi-Bold",
				data: SatoshiBold.buffer,
			},
		],
	});
}

export async function getStaticPaths() {
	const blogPosts = await getCollection("lab");
	return blogPosts.map((post) => ({
		params: { slug: post.slug },
		props: { post },
	}));
}
