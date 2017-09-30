<template>
  <div class="app-nav">
    <div v-if="user.username">
      <span>{{ user.username }}</span>
      <button @click="signOut">sign out</button>
    </div>
    <div v-if="!user.username">
      <router-link to="/sign-in">sign in</router-link>
      <router-link to="/sign-up">sign up</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-nav',
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      signOut() {
        this.$store.dispatch('signOut')
        this.$router.replace('/')
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
