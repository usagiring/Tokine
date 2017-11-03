<template>
  <div class="app-nav">
    <div class="sign-btn-group" v-if="user.username">
      <router-link class="username" :to="profile">{{ user.username }}</router-link>
      <el-button class="sign-out-btn" type="text" @click="signOut">sign out</el-button>
    </div>
    <div class="sign-btn-group" v-if="!user.username">
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
      },
      profile() {
        return `${this.$store.state.user.username}/profile`
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

<style scoped lang="scss">
  @import '../style/common/variables';

  .app-nav {
    position: relative;
    height: 40px;
    background: $blue;
  }

  .sign-btn-group {
    position: absolute;
    right: 30px;
    line-height: 40px;

    > a {
      color: $white;
      font-size: large;
      margin-right: 20px;
    }

    > a:hover {
      text-decoration: underline;
    }
  }

  .username {
    font-weight: bold;
  }

  .sign-out-btn {
    color: $white;
    font-size: large;
    margin-right: 20px;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
