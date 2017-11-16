const {resolve, join} = require('path')
const CLIENT_FOLDER = resolve(__dirname, '../')
const utils = require('./utils')
const config = require('../config')

const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//添加热重载
const hotClient = 'webpack-hot-middleware/client?noInfo=true&reload=true'

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [hotClient].concat(baseWebpackConfig.entry[name])
})
let devConfig = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin((chunk)=>{
      if(chunk.name){
        return chunk.name;
      }
      return chunk.mapModules(m=>path.relative(m.context, m.request)).join("_");
    }),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息,
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: CLIENT_FOLDER + '/src/modules/admin/index.html',
      inject: 'body',
      chunks: ['modules/admin'],
      minify: { // 压缩的方式
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),

    new HtmlWebpackPlugin({
      filename: 'front.html',
      template: CLIENT_FOLDER + '/src/modules/front/index.html',
      inject: 'body',
      chunks: ['modules/front'],
      minify: { // 压缩的方式
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),

    new FriendlyErrorsPlugin()
  ]
})

module.exports = devConfig
