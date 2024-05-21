import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Satoshi", ...defaultTheme.fontFamily.sans],
				serif: ["AppleGaramond", ...defaultTheme.fontFamily.serif],
			},
			colors: {
				bg: "#F6F4EF",
				primary: "#FA5A38",
				title: "#535353",
				body: "#666",
				hoverColor: "#FFEEE1",
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss"],
};
