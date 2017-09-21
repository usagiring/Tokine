<template>
  <div class="login-container">
    <div>
      login
    </div>
    <div>
      <div>
        username:
      </div>
      <div>
        password:
      </div>
    </div>
    <el-button type="primary">login</el-button>
    <router-link to="/register">register</router-link>
  </div>
</template>

<script>
  import Vue from 'vue'
//  let vm  = new Vue()

  export default {
    name: 'login'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
