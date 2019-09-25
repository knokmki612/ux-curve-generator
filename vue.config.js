const path = require('path')

module.exports = {
  lintOnSave: false,

  pages: {
    app: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    },
    helpJa: {
      entry: 'src/assets/tailwind.sass',
      template: 'public/ja/how-to-use.html',
      filename: 'ja/how-to-use.html'
    },
    help: {
      entry: 'src/assets/tailwind.sass',
      template: 'public/en/how-to-use.html',
      filename: 'en/how-to-use.html'
    }
  },

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
