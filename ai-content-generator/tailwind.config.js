/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f5f4f2",
        peach: {
          DEFAULT: "#f4a88a",
          light: "#f9d4c4",
          dark: "#e8926f",
        },
        sidebar: "#f9f1eb",
        charcoal: "#1a1a1a",
        muted: "#6b6b6b",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.06)",
        card: "0 2px 12px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
