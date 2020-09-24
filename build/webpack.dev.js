// const Webpack = require('webpack');
const path = require('path');
const WebpackConfig = require('./webpack.base');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(WebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9520,
    host: '0.0.0.0',
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../app/public'),
    compress: true,
    historyApiFallback: {
      rewrites: [
        { from: '/', to: `/index.html` },
      ]
    },

    proxy: {
      '/api': {
        target: 'http://localhost:9521',
        logLevel: 'debug',
        pathRewrite: {
          '^/api': ''
        }
      },
      // proxy websocket
      '/socket': {
        target: 'ws://10.130.170.201:9521',
        logLevel: 'debug',
        ws: true,
        pathRewrite: {
          '^/socket': ''
        }
      }
    },
    // fix: ngrok tips: Invalid Host header
    disableHostCheck: true
  },
  plugins: [
    // new Webpack.HotModuleReplacementPlugin()
  ]
})
