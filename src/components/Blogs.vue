<template>
  <div id="blogs">
    <div>
      <div v-for="blog in blogs">
        <hr>
        <span @click="blogDetail(blog)">{{blog.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {get} from '../utilities/rest'

  export default {
    name: 'blogs',
    data() {
      return {
        blogs: []
      }
    },
    created() {
      let url = '/blogs';
      get(url)
        .then(blogs => {
          this.blogs = blogs
        })
    },
    computed: {},
    methods: {
      blogDetail(blog) {
        this.$router.push(`/blog/${blog._id}`)
      }
    }
  }
</script>

<style scoped>

</style>
