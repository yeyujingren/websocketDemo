// 抽离第三方模块
// 需要在html模板中引入相关的依赖
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // 需要打包的模块数组
  entry: {
    vendor: ['react', 'antd-mobile']
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    // path: path.resolve(__dirname, '../app/public/static/js'),
    filename: '[name].dll.js',
    // 需要同webpack.DllPlugin 中的“name: '[name]_library'”保持一直
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname,
      // entryOnly: true,
    })
  ]
}
