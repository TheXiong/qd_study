import Vue from 'vue'
import App from './app.vue'
import router from './router.js'

var app = new Vue({
  el: "#app",
  router,
  render: h=>h(App)
})