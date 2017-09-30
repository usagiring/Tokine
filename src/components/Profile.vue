<template>
  <div>
    <span>profile</span>
    <div>
      <span>{{ user.uid }}</span>
      <span>{{ user.username }}</span>
      <span>{{ user.birthday }}</span>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'profile',
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>

<style scoped>
</style>
