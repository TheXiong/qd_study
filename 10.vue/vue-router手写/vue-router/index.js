class History {
    constructor(options) {
        this.current = null
    }
}

class VueRouter {
    constructor(options) {
        this._Vue = null;
        this.mode = options.mode || 'has'
        this.routes = options.routes || []
        //将routes变成{'/home':Home,'/about':About}结构
        this.routesMap = this.createRoutesMap(this.routes);
        this.history = new History()
        this.init()
    }
    init() {
        if (this.mode == 'hash') {
            //打开时先判断location有没有hash，如果没有先跳转到#/
            location.hash ? '' : location.hash = '/'
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            //没有pathname跳转到根路径
            location.pathname ? '' : location.pathname = '/'
            window.addEventListener('load', () => {
                this.history.current = location.pathname
            })
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname
            })
        }
    }
    go(n) {
        window.history.go(n)
    }
    back() {
        window.history.back()
    }
    push(path) {
        if (this.mode == 'hash') {
            window.location.hash = path
        }else{
            this.history.current = path;
            window.history.pushState({},null,path)
        }
    }
    createRoutesMap(routes) {
        return routes.reduce((map, current) => {
            map[current.path] = current.component
            return map
        }, {}) //传初始值为{}
    }
}

VueRouter.install = (Vue) => {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.router) {
                this.$router = this.$options.router
            } else {
                this.$router = this.$parent.$router
            }
            //收集依赖，current变化时更新相应组件
            Vue.util.defineReactive(this.$router.history, 'current', null)
        }
    })

    Vue.component('router-view', {
        render(h) {
            let current = this._self.$router.history.current
            let routesMap = this._self.$router.routesMap
            return h(routesMap[current])
        },
    })
    Vue.component('router-link', {
        props: {
            to:{
                type: String
            },
            tag:{
                type:String,
                default:'a'
            },
            "active-class":{
                type: String
            }
        },
        render(h) {
            return h(this._self.tag, 
                { on: 
                    { click: () => { 
                        this._self.$router.push(this._self.to) 
                        }
                    } 
                }, this._self.$slots.default)
        }
    })
}

export default VueRouter