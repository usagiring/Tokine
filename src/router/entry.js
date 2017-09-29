import Hello from '../components/Hello.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

export default [
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
  }
]
