const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: "[name].js"
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js", //todo
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.vue', '.json']
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9646
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            filename: 'index.html'
        })
    ]
}