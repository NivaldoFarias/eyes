/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{html,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateRows: {
				13: "repeat(13, minmax(0, 1fr))",
				14: "repeat(14, minmax(0, 1fr))",
				15: "repeat(15, minmax(0, 1fr))",
				16: "repeat(16, minmax(0, 1fr))",
				17: "repeat(17, minmax(0, 1fr))",
				18: "repeat(18, minmax(0, 1fr))",
			},
		},
	},
	plugins: [],
};
