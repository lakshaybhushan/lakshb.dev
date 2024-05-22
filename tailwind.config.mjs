import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Satoshi", ...defaultTheme.fontFamily.sans],
				heading: ["SF-Pro", "sans-serif"],
			},
			colors: {
				primary: "#00997E",
				title: "#535353",
				body: "#666",
				hoverColor: "#E1FFEF",
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss"],
};
