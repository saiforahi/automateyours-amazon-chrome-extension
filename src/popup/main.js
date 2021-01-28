import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from '../store'
import {router} from '../router/index'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  BootstrapVue,
  IconsPlugin,
  store,
  router,
  render: h => h(App)
})
