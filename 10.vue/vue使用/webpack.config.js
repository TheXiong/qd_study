const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
            // vue$: "vue/dist/vue.esm.js", //如果要连vue的compiler也引入
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
                //vue-loader：解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，
                //再分别把它们交给对应的 Loader 去处理。
                //vue-template-compiler：把 vue-loader 提取出的 HTML 模版编译成对应的可执行的 JavaScript 代码，
                //这和 React 中的 JSX 语法被编译成 JavaScript 代码类似。
                //预先编译好 HTML 模版相对于在浏览器中再去编译 HTML 模版的好处在于性能更好。
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
        //它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
        //例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    ]
}