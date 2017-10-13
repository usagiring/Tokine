<template>
  <div id="blogs">
    <div>
      <div v-for="blog in blogs">
        <hr>
        <router-link :to="blogDetail(blog)">{{blog.title}}</router-link>
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
        return `/blog/${blog._id}`
      }
    }
  }
</script>

<style scoped>

</style>
