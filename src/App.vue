<template>
  <div id="app">
    <div class="app-head">
      <appNav></appNav>
    </div>
    <div class="app-body">
      <router-view></router-view>
    </div>
    <div class="app-footer">

    </div>
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

<style scoped lang="scss">

  #app {
    position: relative;
    height: 100%;
  }

  .app-body {
    position: relative;
    /*display: flex;*/
    /*height: calc(100% - 40px);*/
  }
</style>
