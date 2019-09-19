class TailwindExtractor {
  static extract (content) {
    // eslint-disable-next-line no-useless-escape
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

module.exports = context => ({
  plugins: {
    tailwindcss: {},
    '@fullhuman/postcss-purgecss': context.env === 'production'
      ? {
        content: ['./public/**/*.html', './src/**/*.vue'],
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ['html', 'js', 'vue']
          }
        ]
      }
      : false,
    autoprefixer: {}
  }
})
