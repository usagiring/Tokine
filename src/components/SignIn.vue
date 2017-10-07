<template>
  <div id="sign-in" class="sign-in-container">
    <div>
      Sign In
    </div>
    <div>
      <div>
        <span>username:</span>
        <el-input size="small" v-model="username" placeholder="please input username"></el-input>
      </div>
      <div>
        <span>password:</span>
        <el-input size="small" v-model="password" placeholder="please input password"></el-input>
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
        username: '',
        password: ''
      }
    },
    methods: {
      signIn(e) {
        return post('/sign-in', {
          username: this.username,
          password: this.password
        })
          .then(user => {
            console.log(user)
            this.$store.commit('setUser', user)
            this.$router.push('/')
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

  .sign-in-container {
    text-align: center;
  }

  .el-input {
    display: inline-block;
    width: 300px;
  }
</style>
