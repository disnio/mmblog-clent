'use strict';
const config = require("../config");
const express = require('express');
const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const hotMiddleware = require('webpack-hot-middleware');
const devMiddleware = require('webpack-dev-middleware');
const clientConfig = require('./webpack.client-dev.config');

const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const app = express();

let proxypath;
const context = config.dev.context;
switch (process.env.NODE_ENV) {
    case 'development':
    case 'production':
        proxypath = 'http://localhost:' + config.server.port;
        break;
    case 'online':
        proxypath = 'http://www.wuaim.com:' + config.server.port;
        break;
    default:
        proxypath = config.dev.proxypath
}
const proxyOptions = {
    target: proxypath,
    changeOrigin: true,
};
// 路径重写 pathRewrite: {'^/old/api' : '/new/api'}
// 路由重写 router { 'integration.localhost:3000' : 'http://localhost:8001'}
if (context.length) {
    app.use(proxyMiddleware(context, proxyOptions))
}

const clientCompiler = webpack(clientConfig)

const devMid = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    // quiet: true,
    stats: {
        colors: true
    },
    //noInfo: true
});

const hotMid = hotMiddleware(clientCompiler, {
    log: false,
    heartbeat: 2000
});

// force page reload when html-webpack-plugin template changes
// clientCompiler.plugin('compilation', function (compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//         hotMid.publish({
//             action: 'reload'
//         });
//         cb()
//     })
// });

app.use(hotMid);
// 路由直接走historyApiFallback,不用服务端渲染
app.use(historyApiFallback({
    verbose: true,
    index: '/front.html',
    rewrites: [
        {from: /^\/admin$/, to: '/admin.html'},
        {from: /^\/admin\/login/, to: '/admin.html'},
        {from: /^\/front/, to: '/front.html'}
    ]
}));

app.use(devMid);


const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

console.log(staticPath)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:8889';

const devport = 8889;

devMid.waitUntilValid(() => {
    app.listen(devport, function (err) {
        if (err) {
            console.log(err)
            return
        }
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            opn(uri)
        }
        console.log('开发服务器已运行在端口： ', devport)
    })
})

