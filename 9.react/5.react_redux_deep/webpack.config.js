const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve('./dist'),
        filename: "[name].js"
    },
    resolve:{
        alias: {
            "@":path.resolve(__dirname, './src')
        },
        extensions: ['.js', '.jsx', '.json']
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9494
    },
    watchOptions:{

    },
    mode:"development",
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            filename: 'index.html'
        }),
    ]
}