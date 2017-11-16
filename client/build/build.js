import ora from 'ora'
import path from 'path'
import chalk from 'chalk'
// import shell from 'shelljs'
import webpack from 'webpack'
require('shelljs/global')
import config from '../config'
import webpackConfig from './webpack.client-prod.config'

const spinner = ora('构建产品...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
console.log(assetsPath)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
config.silent = true
cp('-R', './client/static/*', assetsPath)
config.silent = false

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))

})
