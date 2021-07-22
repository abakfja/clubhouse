const defaultTheme = require("tailwindcss/defaultTheme");

// tailwind.config.js
module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
