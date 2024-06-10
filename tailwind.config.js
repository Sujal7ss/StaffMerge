{import('tailwindcss').Config} 
module.exports = {
  content: [
    "./src/*.{html,js,jsx}",
    "./src/pages/**/*.{html,js,jsx}",
    "./src/components/**/*.{html,js,jsx}",
    "node_modules/flowbite/lib/esm/**/*.js",
    "node_modules/flowbite-react/dist/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
