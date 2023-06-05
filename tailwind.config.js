/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "bg-azul": "#012236",
                "bg-verde": "#04484d",
                "bg-vermelho": "#380e17",
                "skeleton-blue": "#24313d",
                "blue-button1": "#202020",
                "blue-button2": "#344057",
                "blue-button3": "#313131",
                "roxo-legal": "#6565cf",
            },
            screens: {
                xl: { max: "950px" },
                xp: { max: "460px" },
            },
            keyframes: {
                bganimation: {
                    "0%": "background-position: left",
                    "100%": "background-position: right",
                },
            },
        },
    },
    plugins: [],
};
