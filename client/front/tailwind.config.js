module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'navblue': '#3FA2F6',
        'navbtn' : '#96C9F4'
      },
      boxShadow: {
        'right-side': '4px 0 10px rgba(0, 0, 0, 0.3)', // Custom shadow on the right side
        'bottom-side': '4px 0 10px rgba(0, 0, 0, 0.3)', // Custom shadow on the right side
      },
      fontFamily:{
        jersey:['"Jersey 10"','sans-serif']
      },
    },
  },
  plugins: [],
}
