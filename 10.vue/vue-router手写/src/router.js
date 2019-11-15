import Vue from 'vue'
import VueRouter from '../vue-router/index.js'
import Foo from './foo.vue'
import Bar from './bar.vue'

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

Vue.use(VueRouter)
export default router