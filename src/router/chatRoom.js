const ChatRoom = () => import('../components/ChatRoom.vue')
// const ChatRoom = r => require.ensure([], () => r(require('../components/ChatRoom.vue')))
// import ChatRoom from '../components/ChatRoom.vue'

export default [
  {
    path: '/chat-room',
    name: 'chat-room',
    component: ChatRoom
  }
]
