'use strict';
const config = require("./config");
const express = require('express');
const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const app = express();
const router = express.Router();
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


// 路由直接走historyApiFallback,不用服务端渲染
app.use(historyApiFallback({
    verbose: true,
    index: 'front.html',
    rewrites: [
        {from: /^\/admin$/, to: '/admin.html'},
        {from: /^\/admin\/login/, to: '/admin.html'},
        {from: /^\/front/, to: '/front.html'}
    ]
}));

app.use(express.static(path.join(__dirname, 'dist')));

const uri = 'http://localhost:8889';

const devport = 8889;

app.listen(devport, function (err) {
    if (err) {
        console.log(err)
        return
    }
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    console.log('服务器已运行在端口： ', devport)
});