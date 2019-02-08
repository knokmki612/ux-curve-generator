const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

module.exports = {
  lintOnSave: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PurgecssPlugin({
            paths: glob.sync([
              './src/**/*.vue'
            ])
          })
        ]
      }
    }
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
