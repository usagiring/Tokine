<template>
  <div id="sign-in" class="login-container">
    <div>
      Sign In
    </div>
    <div>
      <div>
        <span>username:</span>
        <input type="text" title="username">
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
  import Vue from 'vue'

  export default {
    name: 'login',
    data: () => {
      return {}
    },
    methods: {
      signIn(e) {
        e.preventDefault()
        console.log('signIn')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
