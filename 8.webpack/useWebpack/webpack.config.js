const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            //css-loader:1.css内容变成json 2.处理@import 3.结合file-loader处理url（）
            { test: /\.css$/, use: ['style-loader','css-loader'] },
            { test: /\.png$/, use: ['file-loader'] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}