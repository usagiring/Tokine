import Hello from '../components/Hello.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
const Calculator = () => import('../components/Calculator.vue')
const Three = () => import('../components/Three.vue')

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
  },
  {
    path: '/calculator',
    component: Calculator
  },
  {
    path: '/three',
    component: Three
  },
  {
    path: '/phaser',
    component: () => import('../components/phaser.vue')
  },
  {
    path: '/qrcode',
    component: () => import('../components/QRCode.vue')
  }
]
