<template>
  <div id="blog">
    <div v-html="blog.content"></div>

  </div>
</template>

<script>
  import {get} from '../utilities/rest'

  export default {
    name: 'blog',
    created() {
      let id = this.$route.params.id
      let url = `/blog/${id}`
      get(url)
        .then(blog => {
          this.blog = blog
        })
    },
    data() {
      return {
        blog: {}
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
