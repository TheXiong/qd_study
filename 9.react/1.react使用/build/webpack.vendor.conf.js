const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        'react': ['react'],
        'react-dom': ['react-dom'],
        "react-router-dom": ["react-router-dom"]
    },
    output: {
        path: path.resolve(__dirname, '../vendor'),
        library: 'react', // 以一个库的形式导出
        libraryTarget: 'var',
        filename: '[name].dll.js'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'react',
            path: path.resolve(__dirname, '../vendor/manifest.json')
        })
    ]
}