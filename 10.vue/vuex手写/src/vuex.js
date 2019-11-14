
let Vue;

let install = _Vue => {
    Vue = _Vue
    Vue.mixin({ //
        //Merge two option objects into a new one.
        //Core utility used in both instantiation and inheritance(*).
        //用于实例化和继承的核心实用程序。
        beforeCreate() { //如果组件自身有写这个函数，不会产生覆盖，两个都会执行

            if (this.$options && this.$options.store) { //最顶层
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

class Store {
    constructor(options) {
        this._s = new Vue({
            data: {
                state: options.state
            }
        })

        //getters
        let getters = options.getters || {};
        this.getters = {}
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this._s.state)
                }
            })
        })

        //mutations
        let mutations = options.mutations || {};
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = (payload) => {
                mutations[mutationName](this._s.state, payload)
            }
        })

        //actions
        let actions = options.actions || {};
        this.actions = {}
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = (payload) => {
                actions[actionName]({ commit: this.commit.bind(this), dispatch: this.dispatch.bind(this) }, payload)
            }
        })

        //modules
    }
    get state() { //store.state
        return this._s.state
    }
    commit(type, payload) {
        this.mutations[type] && this.mutations[type](payload)
    }
    dispatch(type, payload) {
        this.actions[type] && this.actions[type](payload)
    }
}

export default {
    install,
    Store
}