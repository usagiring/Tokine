<template>
  <div class="app-nav">
    <div class="logo-container" @click="toHome">
      <span>ToKiNe</span>
    </div>
    <div class="sign-btn-group" v-if="user.username">
      <Dropdown trigger="click">
        <div>
          <Avatar icon="person"></Avatar>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem>
            <Button type="text">{{ user.username }}</Button>
          </DropdownItem>
          <DropdownItem divided>
            <Button type="text" @click="toProfile">Profile</Button>
          </DropdownItem>
          <DropdownItem>
            <Button @click="signOut" type="text">sign-out</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
      },
      toProfile() {
        this.$router.replace(`/${this.$store.state.user.username}/profile`)
      },
      toHome() {
        this.$router.replace(`/`)
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

  .logo-container {
    position: absolute;
    left: 50px;
    line-height: 40px;
    cursor: pointer;

    color: $white;
    font-weight: bold;
    font-size: 20px;
  }

  .sign-btn-group {
    position: absolute;
    right: 50px;
    line-height: 40px;

    &:hover {
      background: $light-blue;
    }
  }

  .username {
    color: $white;
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
