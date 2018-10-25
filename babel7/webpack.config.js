const path = require("path");
const webpack = require("webpack");
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDebug = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDebug ? 'development' : 'production',
  entry: {
    app: [
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://0.0.0.0:8001",
      "webpack/hot/only-dev-server",
      "./src/index"
    ],
    bundle: [
      "react",
      "react-dom",
      "react-router",
      "babel-polyfill"
    ]
  },

  resolve: {
    extensions: ['.web.jsx', '.web.js', '.js', '.jsx', '.json'],
    alias: {
      // 'mtd-react/lib': path.join(__dirname, './node_modules', 'mtd-react', 'components'),
      // 'mtd-react/es': path.join(__dirname, './node_modules', 'mtd-react', 'components'),
      // 'mtd-react/utils': path.join(__dirname, './node_modules', 'mtd-react', 'utils'),
      // 'mtd-react': path.join(__dirname, './node_modules', 'mtd-react', 'index'),
    },
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    port: 8001,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "app.[hash].js"
  },
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss|css$/,
        use: [
          "style-loader",
          "css-loader",
          // "postcss-loader?sourceMap",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                rucksack(),
                autoprefixer({
                  browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                }),
              ],
            }
          },
          "resolve-url-loader",
          "sass-loader?sourceMap"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          {
            loader: "image-webpack-loader",
            options: {
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                interlaced: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                quality: 65,
                progressive: true
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader"
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        bundle: {
          name: 'bundle',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  },
  // performance: {
  //   hints: true
  // },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: "./src/index.html" }),
  ]
};
