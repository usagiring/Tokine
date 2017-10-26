<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="text">
      <router-link to="/chat-room">Go to chat-room</router-link>
    </el-button>
    <el-button type="text">
      <router-link :to="toProfile">profile</router-link>
    </el-button>
    <el-button type="text">
      <router-link to="/blogs">view blog</router-link>
    </el-button>
    <el-button type="text">
      <router-link to="/blog-new">write blog</router-link>
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {}
    },
    computed: {
      toProfile() {
        return `${this.$store.state.user.username}/profile`
      },
      msg() {
        if (this.$store.state.user.username) {
          return `Hello ${this.$store.state.user.username}`
        } else {
          return 'Hello World'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
    font-size: 50px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .hello {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
  }
</style>
