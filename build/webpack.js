const path = require('path')
const createWebpackConfig = require('@0y0/webpack-config-vanilla')
const pkg = require('../package.json')

module.exports = createWebpackConfig({
  isDev: process.env.NODE_ENV !== 'production',
  appName: pkg.name,
  rootDir: path.join(__dirname, '..')
})
