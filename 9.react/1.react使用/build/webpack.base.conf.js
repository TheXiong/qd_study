//webpack.base.conf.js
'use strict'
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
debugger;
module.exports = {
  // 入口起点
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
  },
  // 解析
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      "@": path.resolve(__dirname, '../src')
    },
  },
  // loader
  module: {
    // noParse: [],
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,// 屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'happypack/loader?id=babel',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body'
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../vendor/manifest.json')
    }),
    new AddAssetHtmlPlugin(
      [
        { filepath: path.resolve(__dirname, '../vendor/react.dll.js'), outputPath: '../dist/js/', publicPath: 'js' },
        { filepath: path.resolve(__dirname, '../vendor/react-dom.dll.js'), outputPath:'../dist/js/', publicPath: 'js' },
        { filepath: path.resolve(__dirname, '../vendor/react-router-dom.dll.js'), outputPath: '../dist/js/', publicPath: 'js' },
      ]
    ),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'babel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),

  ]
}