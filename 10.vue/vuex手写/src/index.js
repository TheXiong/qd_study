import Vue from 'vue'
import App from './app.vue'
import store from './store.js'

let a = 10

var app = new Vue({
  el: "#app",
  store,
  a,
  render: h=>h(App)
})