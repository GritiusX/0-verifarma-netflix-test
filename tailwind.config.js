/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		"./vueform.config.js",
		"./node_modules/@vueform/vueform/themes/tailwind/**/*.vue",
		"./node_modules/@vueform/vueform/themes/tailwind/**/*.js",
	],
	theme: {
		screens: {
			xs: "425px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			"3xl": "1800px",
		},

		extend: {},
	},
	plugins: [require("@vueform/vueform/tailwind")],
};
