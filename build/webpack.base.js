const path = require("path");
const os = require('os');
const px2rem = require('postcss-px2rem');
const flexFixs = require('postcss-flexbugs-fixes');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
// PWA
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
  // 配置入门
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
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
        test: /\.(j|t)sx?$/,
        loader: "eslint-loader",
        enforce: "pre",
        exclude: [/node_modules/, /app/]
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        // 将js文件处理交给id为happyBabel的HappyPack的实例执行
        use: [{
          loader: "happypack/loader?id=happyBabel",
        }],
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".jsx"]
        }
      },

      // Less
      {
        test: /\.css|\.less$/,
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
              ident: "postcss",
              // plugins: [require('autoprefixer')]
              plugins: (ctx) => {
                return [
                  flexFixs,
                  // fix antd-mobile v2.3.0 样式比之前版本减少一半问题.
                  px2rem({
                    remUnit: /antd-mobile/.test(ctx.resourcePath) ? 50 : 100
                  })
                ]
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              strictMath: true,
              noIeCompat: true
            }
          }
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
                  name: 'image/[name].[contenthash:8].[ext]'
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
                  name: 'media/[name].[contenthash:8].[ext]'
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
                  name: 'fonts/[name].[contenthash:8].[ext]'
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
    new ForkTsCheckerWebpackPlugin({
      // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
      async: false
    }),
    // 将TypeScript类型检查错误以弹框提示
    // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
    // 否则建议使用，以方便发现错误
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: true,
      skipSuccessful: true
    }),
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
    ]),
    new WebpackPwaManifest({
      name:'PWA Websocket Demo',
      short_name: 'Websocket Demo',
      description: "a websocket demo ",
      background_color: "#4374A5",
      theme_color: '#4374A5',
      filename: 'manifest.[hash:8].json',
      publicPath: '/',
      icons: [{
        src: path.resolve(__dirname, '../public/android_chrome.png'),
        size: "192x192",
        type: "image/png"
      }, {
        src: path.resolve(__dirname, '../public/launcher-icon.png'),
        sizes: "192x192",
        type: "image/png"
      }]
    }),
    new WorkboxPlugin.GenerateSW({
      // help to start up serviceWorkers faster
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
}
