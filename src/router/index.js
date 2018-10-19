import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

// routes
import entry from './entry'
import user from './user'
import chatRoom from './chatRoom'
import blog from './blog'

const Editor = () => import('../components/markdown.vue')

Vue.use(Router)

let routes = [
  {
    path: '/markdown-editor',
    component: Editor
  }
].concat(
  entry,
  user,
  chatRoom,
  blog
)

let router = new Router({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  let noSignedAuth = entry.map(item => item.path)
  if (noSignedAuth.includes(to.path)) {
    next()
  } else {
    console.log('need Sign in')
    await store.dispatch('me')
    store.state.user? next() : next('/sign-in')
  }
})

export default router
