<template>
  <div class="sign-up-wrapper">
    <div class="container">
      <div class="title">Sign Up</div>
      <el-input v-model="username" placeholder="Username" icon="fa-user"></el-input>
      <el-input v-model="password" placeholder="Password" icon="fa-key"></el-input>
      <el-input v-model="replyPassword" placeholder="Reply Password" icon="fa-key"></el-input>
      <el-input v-model="email" placeholder="Email" icon="fa-envelope"></el-input>
      <el-input v-model="phone" placeholder="Phone" icon="fa-phone"></el-input>
      <div>
        <el-button class="sign-up-btn" type="primary" @click.prevent="signUp">Sign Up</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {post} from '../utilities/rest'
  import _ from 'lodash'

  export default {
    name: 'sign-up',
    data: () => ({
      username: null,
      password: null,
      replyPassword: null,
      email: null,
      phone: null
    }),
    methods: {
      signUp() {
        return post('/users', {
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone
        })
          .then(user => {
            this.$store.commit('setUser', user)
            this.$router.push('/')
          })
      }
    }
  }
</script>

<style scoped lang="scss">

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .sign-up-wrapper {
    padding-top: 10%;
    height: 100%;
    background: rgba(243, 243, 243, 0.05); // 登录页背景
  }

  .container {
    width: 450px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ffffff;
  }

  .el-input {
    width: 300px;
    margin-top: 10px;
    background-color: transparent; // 透明
  }

  .sign-up-btn {
    margin-top: 30px;
    width: 300px;
  }
</style>
