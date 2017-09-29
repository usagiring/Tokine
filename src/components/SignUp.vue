<template>
  <div class="login-container">
    <div>
      Sign Up
    </div>
    <div>
      <div>
        <span>username:</span>
        <input v-model="username" title="username"/>
      </div>
      <div>
        <span>password:</span>
        <input v-model="password" title="password"/>
      </div>
      <div>
        <span>email:</span>
        <input v-model="email" title="email"/>
      </div>
      <div>
        <span>phone:</span>
        <input v-model="phone" title="phone"/>
      </div>
    </div>
    <el-button type="primary" @click.prevent="signUp">Sign Up</el-button>
  </div>

</template>

<script>
  import {post} from '../utilities/rest'
  import router from '../router/index'
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
        return post('/users', _.pick(this.data, ['username', 'password', 'email', 'phone']))
          .then(() => {
            router.push('/')
          })
      }
    }
  }
</script>

<style scoped>
</style>
