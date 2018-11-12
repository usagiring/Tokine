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

  .app-head {
    position: fixed;
    height: 40px;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .app-body {
    position: relative;
    top: 40px;
    /*display: flex;*/
    height: calc(100% - 40px);
  }
</style>
