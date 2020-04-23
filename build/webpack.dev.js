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
    contentBase: path.resolve(__dirname, '../app/public'),
    compress: true,
    historyApiFallback: {
      rewrites: [
        { from: '/', to: `/index.html` },
      ]
    },

    proxy: {
      '/api': 'http://127.0.0.1:8080',
    },
    // fix: ngrok tips: Invalid Host header
    disableHostCheck: true
  },
  plugins: [
    // new Webpack.HotModuleReplacementPlugin()
  ]
})
