const path = require('path')
const MyPulgin = require('./plugins/myplugin.js')
const AsyncPlugin = require('./plugins/asyncPlugin.js')

module.exports = {
    entry:{
        main: path.resolve(__dirname,"./src/index.js")
    },
    output:{
        path: path.resolve(__dirname,"./dist"),
        filename: "[name].js"
    },
    plugins:[
        new MyPulgin({name:"xxx"}),
        new AsyncPlugin()
    ]
}