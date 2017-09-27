import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Profile from '../components/Profile.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // redirect: '/login'
      // name: 'Hello',
      component: Hello
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: ':name/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
