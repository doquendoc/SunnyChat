
module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {},
  darkMode: 'class',
  variants: {
    extend: {
      textOpacity: ['dark']
    }
  },
  plugins: [],
}
