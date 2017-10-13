<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/chat-room">Go to chat-room</router-link>
    <router-link :to="toProfile">Go to profile</router-link>
    <router-link to="/blogs">Go to blogs</router-link>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
      }
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
    margin-top: 60px;
  }
</style>
