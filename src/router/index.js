import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import store from '../store/index'

// routes
import entry from './entry'
import user from './user'
import chatRoom from './chatRoom'
import blog from './blog'
import lottery from './lottery'

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
  blog,
  lottery
)

let router = new Router({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  iView.LoadingBar.start();
  let noSignedAuth = entry.map(item => item.path)
  if (noSignedAuth.includes(to.path)) {
    next()
  } else {
    await store.dispatch('me')
    store.state.user && store.state.user._id ? next() : next('/sign-in')
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish();
});

export default router
