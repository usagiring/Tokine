// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import * as tools from './utilities/tools'

import iView from 'iview';
import ElementUI from 'element-ui'
import 'iview/dist/styles/iview.css';

import './style/application.scss'
import './style/iview-customize.less'
import htmlEditor from 'vue-html-editor'

Vue.prototype.tools = tools;
Vue.use(htmlEditor)
Vue.use(ElementUI)
Vue.use(iView)

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
  components: {App},
  created() {
    this.isSigned();
  },
  methods: {
    isSigned() {
      store.dispatch('signed')
    }
  }
})
