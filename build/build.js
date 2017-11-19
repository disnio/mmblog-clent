'use strict';
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.client-prod.config');
require('shelljs/global');
const spinner = ora('构建产品...');
spinner.start();

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', './static/*', assetsPath);
config.silent = false;

webpack(webpackConfig, function (err, stats) {
    spinner.stop();

    if (err) throw err;

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
        console.log(chalk.red('发生错误构建失败\n'));
        process.exit(1)
    }

    console.log(chalk.cyan('构建完成\n'))
});
