// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/application.scss'
import {Button, Select} from 'element-ui'
import store from './store/index'

Vue.use(Button)
Vue.use(Select)

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  store,
  data() {
    return {
      user: null
    }
  },
  template: '<App/>',
  components: {App}
})
