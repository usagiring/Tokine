<template>
  <div class="sign-up-container">
    <div>
      Sign Up
    </div>
    <div class="sign-up-content">
      <div>
        <span>username:</span>
        <el-input size="small" v-model="username" placeholder="please input username"></el-input>
      </div>
      <div>
        <span>password:</span>
        <el-input size="small" v-model="password" placeholder="please input password"></el-input>
      </div>
      <div>
        <span>email:</span>
        <el-input size="small" v-model="email" placeholder="please input email"></el-input>
      </div>
      <div>
        <span>phone:</span>
        <el-input size="small" v-model="phone" placeholder="please input phone"></el-input>
      </div>
    </div>
    <el-button type="primary" @click.prevent="signUp">Sign Up</el-button>
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
  .sign-up-container {
    text-align: center;
  }

  .sign-up-content {
    > div {

      > span {
        display: inline-block;
        width: 100px;
      }
    }
  }

  .el-input {
    display: inline-block;
    width: 300px;
  }
</style>
