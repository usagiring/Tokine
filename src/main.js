// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { server } from '../config/baseAPI'

import App from './App.vue'
import router from './router'
import store from './store/index'

import * as tools from './utilities/tools'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import './style/application.scss'
import './style/iview-customize.less'
import htmlEditor from 'vue-html-editor'

Vue.prototype.tools = tools;
Vue.use(htmlEditor)

Vue.use(iView, {

})

const httpLink = new HttpLink({
  uri: `${server}/graphql`
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

Vue.prototype.$Message.config({
  top: 50,
  duration: 7
});

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err)
}

export default new Vue({
  el: '#app',
  router,
  store,
  data() {
    return {
      user: null
    }
  },
  apolloProvider,
  template: '<App/>',
  components: { App },
  created() {
    this.isSigned();
  },
  methods: {
    isSigned() {
      store.dispatch('me')
    }
  }
})
