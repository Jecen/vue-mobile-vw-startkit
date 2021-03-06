'use strict'
const path = require('path')
const webpack = require('webpack')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.common')('development')
const devServer = require('./server')
// const LogPlugin = require('./log-plugin')
// const _ = require('./utils')

base.devtool = 'eval-source-map'
base.devServer = devServer
base.plugins.push(
  new HtmlWebpackPlugin({
    title: 'vue-mobile-vw-startkit',
    template: path.resolve(__dirname, '../public/index.html'),
    inject: true,
  }),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new FriendlyErrors()
)

module.exports = base
