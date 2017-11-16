// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    server: {
      port: 8000
    },
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8000,
        devport: 8889,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        autoOpenBrowser: true,
        context: [ //代理路径
            '/api'
        ],
        proxypath: 'http://localhost:8000',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}