const path = require('path');
const webpack = require('webpack');

// css 单独打包，使用该插件后就不需要配置style-loader了
// 本来是内联在最终的网页里，现在通过外联方式，可以在/dist文件夹下找到单独的css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/entry.js', // 唯一的入口文件
    // common: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'mockjs'] // 这里是依赖的库文件配置，和CommonsChunkPlugin配合使用可以单独打包
  },
  output: {
    //path: '/dist', //打包后的文件存放的地方
    //filename: 'bundle.js',
    //publicPath: 'http://localhost:5001/dist/' //启动本地服务后的根目录
    path: path.join(__dirname, '/public/dist'), //打包后的文件存放的地方
    filename: '[name].js',
    publicPath: '/dist/'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    //progress: true
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      components: __dirname + '/src/components',
      // actions: __dirname + '/src/redux/actions',
      // reducers: __dirname + '/src/redux/reducers',
      // 'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      //include:[APP_PATH, ASSET_PATH]
    }, {
      test: /\.md$/,
      use: ['html-loader', 'markdown-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      //use: [ 'style-loader', 'css-loader' ]
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader"]
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({    // css 单独打包，（2.x 改变很大）
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      //loader: 'url-loader?limit=25000'
      use: { loader: 'url-loader', options: { limit: 25000 } },
      exclude: /node_modules/
    }]
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new webpack.HotModuleReplacementPlugin(),//热更新
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
  ]
};