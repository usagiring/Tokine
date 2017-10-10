<template>
  <div class="sign-up-wrapper">
    <div class="container">
      <div class="title">Sign Up</div>
      <el-input v-model="username" placeholder="Username" icon="fa-user" autofocus></el-input>
      <el-input type="password" v-model="password" placeholder="Password" icon="fa-key"></el-input>
      <el-input type="password" v-model="replyPassword" placeholder="Reply Password" icon="fa-key"></el-input>
      <span class="err" v-if="!isPwdPass">输入密码不一致</span>
      <el-input v-model="email" placeholder="Email" icon="fa-envelope"></el-input>
      <el-input v-model="phone" placeholder="Phone" icon="fa-phone"></el-input>
      <div>
        <el-button class="sign-up-btn" type="primary" @click.prevent="signUp" :disabled="!validate">Sign Up</el-button>
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
    computed: {
      isFilled() {
        return !!(this.username && this.password && this.replyPassword)
      },
      isPwdPass() {
        if (!this.replyPassword) return true
        if (this.password && !this.replyPassword) return false
        return this.password === this.replyPassword
      },
      validate() {
        return this.isFilled && this.isPwdPass
      }
    },
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
  @import '../style/common/variables';

  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .sign-up-wrapper {
    padding-top: 10%;
    height: 100%;
    background: rgba(243, 243, 243, 0.05); // 登录页背景
  }

  .container {
    position: relative;
    width: 300px;
    margin: 0 auto;
    border: 1px solid #ffffff;
  }

  .el-input {
    margin-top: 10px;
    background-color: transparent; // 透明
  }

  .sign-up-btn {
    margin-top: 30px;
    width: 300px;
  }

  .err {
    position: relative;
    top: 6px;
    left: 12px;
    color: $danger;
    font-size: 12px;
  }
</style>
