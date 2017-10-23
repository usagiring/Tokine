<template>
  <div id="blogs">
    <div class="blog-container">
      <div v-for="blog in blogs">
        <hr>
        <router-link :to="blogDetail(blog)">
          <span class="title">{{blog.title}}</span>
        </router-link>
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

<style scoped lang="scss">

  @import '../style/common/variables';
  .blog-container {
    padding: 20px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
  }

</style>
