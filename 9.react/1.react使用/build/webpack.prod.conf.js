//webpack.prod.conf.js
'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const path = require('path');
const webpack = require('webpack');
// 注意：此插件3.0版本引用时候需要大括号，2.0版本则不用
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    // 模式
    mode: "production",
    // 调试工具
    // devtool: '#source-map',
    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[chunkhash].js",
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new ParallelUglifyPlugin({ //代码压缩用ParallelUglifyPlugin代替自带的 UglifyJsPlugin插件,自带的JS压缩插件是单线程执行的，而webpack-parallel-uglify-plugin可以并行的执行
            // test,
            // include,
            // exclude,
            // workerCount,
            // sourceMap,
            cacheDir: '.cache/',
            uglifyJS: {
                output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                },
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    // warnings: false,
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            },
            // uglifyES: {
            // }
        })
    ],
    // 代码分离相关
    optimization: {
        nodeEnv: 'production',
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                }
            }
        }
    }
});