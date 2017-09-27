<template>
  <div id="sign-in" class="login-container">
    <div>
      Sign In
    </div>
    <div>
      <div>
        <span>username:</span>
        <input v-model="name" title="username" placeholder="input username">
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
  export default {
    name: 'sign-in',
    data: () => {
      return {
        name: ''
      }
    },
    methods: {
      signIn(e) {
        e.preventDefault()
        return post('/api/sign-in', {name: this.name})
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
