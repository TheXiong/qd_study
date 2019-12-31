// router.js
import Vue from 'vue'
import Router from 'vue-router'

const Bar = () => import('./Bar.vue')
const Foo = () => import('./Foo.vue')

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/bar',
                component: () => import('./Bar.vue')
            },
            {
                path: '/foo',
                component: () => import('./Foo.vue')
            }
        ]
    })
}