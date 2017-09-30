<template>
  <div id="app">
    <appNav></appNav>
    <router-view></router-view>
  </div>
</template>

<script>
  import appNav from './components/Nav.vue'

  export default {
    name: 'app',
    components: {
      appNav
    }
  }
</script>
