/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        header: "clamp(1.125rem, 1.25vw, 1.5rem)",
        medium: "0.9375rem"
      },
      boxShadow: {
        'md': '0px 4px 6px 0px rgba(54, 78, 126, 0.10);'
      }
    },
    screens: {
      'md': '768px',
      'desktop': '1440px'
    },
    colors: {
      'purple': '#635FC7',
      'purple-hover': '#A8A4FF',
      'darkBlack': '#000112',
      'veryDarkGray': '#20212C',
      'darkGray': '#2B2C37',
      'gray': '#3E3F4E',
      'lightGray': '#828FA3',
      'lightBlue': '#E4EBFA',
      'lightBlueBg': '#F4F7FD',
      'white': '#FFF',
      'red': '#EA5555',
      'red-hover': '#FF9898',
      'grey-button': 'rgba(99, 95, 199, 0.10)'
    }
  },
  plugins: [],
}

