/**
 
整体思路：
1.模板编译
2.数据代理----vm.msg->vm._data.msg
3.数据劫持----defineProperty->getter,setter
4.依赖收集----dep，watcher，render调用getter收集
5.组件挂载与更新---patch


模板编译------生成render函数
new Vue的写法(优先级排列)：

new Vue({
    render:h=>h(App)
})

new Vue({
    template:"<div>app</div>"
})

new Vue({
    el:'#app'
})
platforms/web/entry-runtime-with-compiler.js用来拓展$mount方法，目的就是适配上面三种写法
platforms/web/runtime/index.js是$mount的实现




 */