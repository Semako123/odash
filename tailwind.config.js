/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				green: "0px 20px 50px #1ED76152",
			},
			colors: {
				light: {
					primary: "#FFFFFF",
					secondary: "#F1F1F1",
					accent: "#FCFCFC",
				},
				dark: {
					primary: "#0E131B",
					secondary: "#2D3748",
					accent: "#17202C",
				},
			},
		},
	},
	plugins: [],
};
