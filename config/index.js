'use strict';
const path = require('path');

module.exports = {
    server: {
        baseUrl: "http://localhost:8000",
        port: 8000
    },
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../dist/front.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        autoOpenBrowser: true,
        context: [
            '/api'
        ],
        proxyTable: {},
        proxypath: 'http://localhost:8000',
        cssSourceMap: false
    }
};
