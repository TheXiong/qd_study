const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    // resolveLoader: {
    //     modules: ['node_modules',path.resolve(__dirname, "./loaders")],
    //     extensions: ['.js', '.json']
    // },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: path.resolve(__dirname, "./loaders/style_loader.js"),
                        options: {}
                    },
                    {
                        loader: path.resolve(__dirname, "./loaders/less_loader.js"),
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./public/index.html'),
            filename: "index.html"
        })
    ]
}