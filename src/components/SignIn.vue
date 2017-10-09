<template>
  <div id="sign-in" class="sign-in-wrapper">
    <div class="container">
      <div class="title">
        Sign In
      </div>
      <div>
        <div>
          <el-input size="small" v-model="username" placeholder="please input username" icon="fa-user"></el-input>
        </div>
        <div>
          <el-input size="small" v-model="password" placeholder="please input password" icon="fa-key"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="signIn">Sign In</el-button>
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
    background: rgba(0, 255, 120, 0.05); // 登录页背景
  }

  .container {
    width: 450px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ffffff;
  }

  .el-input {
    display: inline-block;
    width: 300px;

    background-color: transparent; // 透明
  }
</style>
