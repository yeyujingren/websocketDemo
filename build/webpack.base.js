const path = require("path");
const os = require('os');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
  // 配置入门
  entry: {
    main: path.resolve(__dirname, '../src/index.jsx'),
  },

  // 配置打包后文件路径
  output: {
    path: path.resolve(__dirname, '../app/public'),
    // 静态资源的路径（cdn地址）
    publicPath: '/',
    filename: "[name]/[chunkhash:8].js",
    // This option determines the name of non-entry chunk files.
    chunkFilename: "[name]/[chunkhash:8].chunk.js"
  },

  module: {
    rules: [
      // js || jsx
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        enforce: "pre",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // 将js文件处理交给id为happyBabel的HappyPack的实例执行
        use: [{
          loader: "happypack/loader?id=happyBabel",
        }],
        resolve: {
          extensions: [".js", ".jsx"]
        }
      },

      // Less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'less-loader'
        ]
      },

      // 图片文件
      {
        test: /\.(jpe?g|png|gif)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[chunkhash:8].[ext]'
                }
              }
            }
          }
        ]
      },

      // 媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[chunkhash:8].[ext]'
                }
              }
            }
          }
        ]
      },

      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[chunkhash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.jsx', '.js', '.less', '.json']
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    // 拆分css
    new MiniCssExtractPlugin({
      filename: "[name]/[contenthash:8].bundle.css",
      chunkFilename: "[name]/[contenthash:8].chunk.css"
    }),
    // 使用happyPack开启多进程loader转换，加快打包时间
    new HappyPack({
      id: 'happyBabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {modules: false}]
            ],
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new Webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../vendor-manifest.json')
    }),
    new CopyWebpackPlugin([  // copy生成的静态文件到app/public目录下面
      {from: 'static', to: path.resolve(__dirname, '../app/public')}
    ])
  ]
}
