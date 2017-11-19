'use strict';
const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf');
const config = require('../config');
const utils = require('./utils');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        'modules/admin': [
            'babel-polyfill', './src/modules/admin/app'
        ],
        'modules/front': [
            'babel-polyfill', './src/modules/front/app'
        ]
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    externals: {
        'simplemde': 'SimpleMDE'
    },
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
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias:
            {
                'vue$':
                    'vue/dist/vue.esm.js',
                'vuex$':
                    'vuex/dist/vuex.esm.js',
                'vue-router$':
                    'vue-router/dist/vue-router.esm.js',
                'simplemde$':
                    'simplemde/dist/simplemde.min.js',
                'highlight.js$':
                    'highlight.js/lib/highlight.js',
                'fastclick':
                    'fastclick/lib/fastclick.js',
                '@': resolve('src'),
                'lib':resolve('src/lib'),
                'api':resolve('src/api'),
                'publicComponents':resolve('src/components'),
                'serverConfig':resolve('server/configs/'),
            }
    }
}
