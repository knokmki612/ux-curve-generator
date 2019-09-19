const path = require('path')

class TailwindExtractor {
  static extract (content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = {
  lintOnSave: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('atoms', path.resolve('src/components/atoms'))
      .set('molecules', path.resolve('src/components/molecules'))
    if (process.env.VUE_CLI_BUILD_TARGET === 'wc') {
      config.module.rule('vue').use('vue-loader').loader('vue-loader')
        .tap(options => {
          options.shadowMode = true
          return options
        })
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
