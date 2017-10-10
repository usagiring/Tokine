<template>
  <div id="sign-in" class="sign-in-wrapper">
    <div class="container">
      <div class="title">Sign In</div>
      <el-input v-model.trim="username" placeholder="Username" icon="fa-user" @change=""></el-input>
      <el-input v-model.trim="password" placeholder="Password" icon="fa-key"></el-input>
      <div>
        <el-button class="sign-in-btn" type="primary" @click="signIn" :disabled="validate">Sign In</el-button>
      </div>
    </div>
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
    computed: {
      validate() {
        return !(this.username && this.password)
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
<style scoped lang="scss">

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .sign-in-wrapper {
    padding-top: 10%;
    height: 100%;
    background: rgba(243, 243, 243, 0.05); // 登录页背景
  }

  .container {
    width: 300px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ffffff;
  }

  .el-input {
    margin-top: 10px;
    background-color: transparent; // 透明
  }

  .sign-in-btn {
    margin-top: 30px;
    width: 300px;
  }
</style>
