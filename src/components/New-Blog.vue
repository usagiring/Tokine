<template>
  <div id="new-blog">
    <editor></editor>
  </div>
</template>

<script>
  import editor from './WYSIWYG.vue'

  export default {
    name: 'new-blog',
    data() {
      return {}
    },
    created(){
    },
    computed: {},
    components: {
      editor
    }
  }
</script>

<style scoped>

</style>
