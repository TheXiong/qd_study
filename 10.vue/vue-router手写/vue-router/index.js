class History {
    constructor(options) {
        this.current = null
    }
}

class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
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
    go() {

    }
    back() {

    }
    push() {

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
        }
    })

    Vue.component('router-view', {
        render(h) {
            let current = this._self.$router.history.current
            let routesMap = this._self.$router.routesMap
            return h('h1', {}, "首页")
        },
    })
    Vue.component('router-link', {
        render(h) {
            return h('h1', {}, "首页")
        }
    })
}

export default VueRouter