/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			"roboto-slab": ["Roboto Slab Variable", "sans"],
			"open-sans": ["Open Sans Variable", "sans"],
			"sans": ["FontMain", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
}

