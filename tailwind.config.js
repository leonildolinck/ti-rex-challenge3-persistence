export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        sm: "410px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1600px",
      },
      boxShadow: {
        "outline-image": "0 0 0 4px rgba(59, 130, 246, 0.5)",
      },
    },
  },
  plugins: [],
};
