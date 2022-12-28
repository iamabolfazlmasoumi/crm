/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "IRANSans": ["IRANSans"],
        "IRANSansBold": ["IRANSansBold"],
        "IRANSansLight": ["IRANSansLight"],
        "IRANSansMedium": ["IRANSansMedium"],
        "IRANSansUltraLight": ["IRANSansUltraLight"],
      },
      colors: {
        "primary": "#FF5B00"
      }
    },
  },
  plugins: [],
}
