import Vue from 'vue'
import vuex from './vuex.js'

Vue.use(vuex)

let store = new vuex.Store({
    state: {
        name: 'zhangsan',
        age: 10
    },
    getters: {
        newAge(state) {
            return state.age + 10
        }
    },
    mutations: {
        addAge(state, payload) {
            return state.age += payload
        },
        minusAge(state, payload) {
            return state.age -= payload
        }
    },
    actions: { //异步操作
        minusAgeAsync({ commit, dispatch }, payload) { //actions里面不一样，可以commit，也可以dispath
            setTimeout(() => {
                commit("minusAge", payload)
            }, 1000)
        }
    }
})

export default store