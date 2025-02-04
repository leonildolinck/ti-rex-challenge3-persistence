export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'], 
    },
    boxShadow: {
      'outline-image': '0 0 0 4px rgba(59, 130, 246, 0.5)',
    },
  },
  },
  plugins: [],
};
