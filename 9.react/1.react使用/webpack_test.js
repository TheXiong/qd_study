const webpack = require('webpack')
const path = require('path')

process.chdir(path.resolve(__dirname))
let compiler = webpack({
    entry: {
        index: path.resolve(__dirname,"./src/index.js")
    },
    output: {
        path: path.resolve('./dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    }
}, () => {
    console.log("end");
});