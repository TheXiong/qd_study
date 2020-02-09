const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
};