import 'babel-polyfill'

import { resolve } from 'path';
const nodeModulesPath = resolve(__dirname, '../../node_modules');
const CLIENT_FOLDER = resolve(__dirname, '../');
import vueLoaderConfig from './vue-loader.conf';
import config from '../config'
import utils from './utils'

let baseConfig = {
  // devtool: 'source-map',
  entry: {
    'modules/admin': [
        'babel-polyfill', CLIENT_FOLDER + '/src/modules/admin/app'
    ],
    'modules/front': [
        'babel-polyfill', CLIENT_FOLDER + '/src/modules/front/entry-client'
    ]
  },
  output: {
    path: CLIENT_FOLDER + '/dist',
    filename: '[name].js',
    // sourceMapFilename: '[name].map',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    'simplemde': 'SimpleMDE'
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [resolve(__dirname, '../src'), nodeModulesPath],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vuex$': 'vuex/dist/vuex.esm.js',
      'vue-router$': 'vue-router/dist/vue-router.esm.js',
      'simplemde$': 'simplemde/dist/simplemde.min.js',
      'highlight.js$': 'highlight.js/lib/highlight.js',
      'fastclick': 'fastclick/lib/fastclick.js',
      '@': resolve('src'),
      'lib': resolve(__dirname, '../src/lib'),
      'api': resolve(__dirname, '../src/api'),
      'publicComponents': resolve(__dirname, '../src/components'),
      'serverConfig': resolve(__dirname, '../../server/configs/'),
    }
  },
  //cache: true
}

module.exports = baseConfig;
