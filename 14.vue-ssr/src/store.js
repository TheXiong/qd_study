import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            value: 0
        },
        mutations: {
            setValue(state, value) {
                state.value = value
            }
        },
        actions: {
            fetchValue({ commit, dispatch }) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(Math.random())
                    }, 1000)
                }).then(value => {
                    commit('setValue', value)
                })
            }
        }
    })
}