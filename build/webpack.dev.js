const Webpack = require('webpack');
const path = require('path');
const WebpackConfig = require('./webpack.base');
const WebpackMerge = require('webpack-merge');
module.exports = WebpackMerge(WebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3000,
    // hot: true,
    contentBase: path.resolve(__dirname, '../app/public'),
    compress: true,  // 
    proxy: {
      '/api': 'http://127.0.0.1:8080',
    }
  },
  plugins: [
    // new Webpack.HotModuleReplacementPlugin()
  ]
})
