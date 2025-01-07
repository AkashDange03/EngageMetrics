/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#22C55E',  // Green as the primary color
          700: '#16A34A',  // Darker green for primary shade
          100: '#A7F3D0',  // Light green for a softer shade of primary
        },
        secondary: '#0F0F0F',  // Black color for secondary
        accent: '#EAB308',  // Accent color (yellow) remains the same
        background: '#F8FAFC',  // Black background
        text: '#FFFFFF',  // White text for contrast
        border: '#252527',  // Dark grey border
        foreground: 'rgb(var(--foreground))',  // Foreground variable
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui'],
        body: ['Roboto', 'system-ui'],
        mono: ['Source Code Pro', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [],
};
