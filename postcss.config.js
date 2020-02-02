const tailwindExtractor = (content) =>
  content.match(/[A-Za-z0-9-_:/]+/g) || []

module.exports = ({ env }) => ({
  plugins: {
    tailwindcss: {},
    '@fullhuman/postcss-purgecss': env === 'production'
      ? {
        content: ['./public/**/*.html', './src/**/*.vue'],
        extractors: [
          {
            extractor: tailwindExtractor,
            extensions: ['html', 'js', 'vue']
          }
        ]
      }
      : false,
    autoprefixer: {}
  }
})
