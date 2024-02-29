export default {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {}, // Add this line before the Tailwind plugin
    'tailwindcss': {},
    'autoprefixer': {},
  },
}
