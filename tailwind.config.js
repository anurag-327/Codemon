/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  content: ["./*.{ejs,html,js,css}", "./**/*.{ejs,html,js,css}"],
  theme: {
    extend: {
      fontFamily: 
      {
      roboto: ["Roboto", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      lobster: ["Lobster", "cursive"]
      },
    },
    screens: {
      'sm': {'min': '0px', 'max': '768px'},
      'md': {'min': '769px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1500px'},
      'xl': {'min': '1500px', 'max': '2000px'},
      '2xl': {'min': '1536px'},
    },
  },
  plugins: [],
}
