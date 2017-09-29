<template>
  <div id="sign-in" class="login-container">
    <div>
      Sign In
    </div>
    <div>
      <div>
        <span>username:</span>
        <input v-model="username" title="username" placeholder="input username">
      </div>
      <div>
        <span>password:</span>
        <input type="password" title="password">
      </div>
    </div>
    <el-button type="primary" @click="signIn">Sign In</el-button>
  </div>
</template>

<script>
  const {post} = require('../utilities/rest')
  import router from '../router/index'

  export default {
    name: 'sign-in',
    data: () => {
      return {
        username: ''
      }
    },
    methods: {
      signIn(e) {
        return post('/sign-in', {username: this.username})
          .then(user => {
            console.log(user)
            this.$store.commit('setUser', user)
//            router.push(`${user.username}/profile`)
            router.push('/')
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
