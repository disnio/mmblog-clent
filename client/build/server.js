import config from '../config'
// const config = require("../config")
import express from 'express'
import opn from 'opn'
import webpack from 'webpack'
import proxyMiddleware from 'http-proxy-middleware'
import historyApiFallback from 'connect-history-api-fallback'
import hotMiddleware from 'webpack-hot-middleware'
import devMiddleware from 'webpack-dev-middleware'

import clientConfig from './webpack.client-dev.config'

const isProd = process.env.NODE_ENV === 'production'
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const app = express()

let proxypath
const context = config.dev.context
switch (process.env.NODE_ENV) {
  case 'development':
  case 'production':
    proxypath = 'http://localhost:' + config.server.port
    break
  case 'online':
    proxypath = 'http://www.wuaim.com:' + config.server.port
    break
  default:
    proxypath = config.dev.proxypath
}
const proxyOptions = {
  target: proxypath,
  changeOrigin: true,
}
// 路径重写 pathRewrite: {'^/old/api' : '/new/api'}
// 路由重写 router { 'integration.localhost:3000' : 'http://localhost:8001'}
if (context.length) {
  app.use(proxyMiddleware(context, proxyOptions))
}

// 路由直接走historyApiFallback,不用服务端渲染
app.use(historyApiFallback({
  verbose: true,
  index: '/front.html',
  rewrites: [
    {from: /^\/admin$/, to: '/admin.html'},
    {from: /^\/admin\/login/, to: '/admin.html'},
    {from: /^\/front/, to: '/front.html'}
  ]
}))
//一定要放在 fallback 后面

const clientCompiler = webpack(clientConfig)
app.use(devMiddleware(clientCompiler, {
  publicPath: clientConfig.output.publicPath,
  stats: {
    colors: true
  },
  //noInfo: true
}))

app.use(hotMiddleware(clientCompiler))
// force page reload when html-webpack-plugin template changes
clientCompiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

const uri = 'http://localhost:' + config.dev.devport

app.listen(config.dev.devport, function (err) {
  if (err) {
    console.log(err)
    return
  }
  if (autoOpenBrowser) {
    opn(uri)
  }
  console.log('开发服务器已运行在端口： ', config.dev.devport)
})

module.exports = app
