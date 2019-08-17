const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

class TailwindExtractor {
  static extract (content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = {
  lintOnSave: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PurgecssPlugin({
            paths: glob.sync([
              './public/*.html',
              './src/**/*.vue'
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ['html', 'js', 'php', 'vue']
              }
            ]
          })
        ]
      }
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('atoms', path.resolve('src/components/atoms'))
      .set('molecules', path.resolve('src/components/molecules'))
  },

  pluginOptions: {
    i18n: {
      locale: 'ja',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
