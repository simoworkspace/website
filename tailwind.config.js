export default {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xl: { max: "950px" },
            xp: { max: "460px" },
            xlr: { min: "950px" }
        }
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
};
