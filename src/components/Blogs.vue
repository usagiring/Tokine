<template>
  <div id="blogs">
    <div class="blog-container">
      <div v-for="blog in blogs">
        <div class="blog-item-container">
          <div class="title-container">
            <router-link class="title" :to="blogDetail(blog)">
              <span>{{blog.title}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {get, remove} from '../utilities/rest'

  export default {
    name: 'blogs',
    data() {
      return {}
    },
    created() {
      if (!this.$store.state.blog.loaded) {
        let url = '/graphql?query={blogs{_id,title}}';

        get(url)
          .then(result => {
            this.$store.commit('setBlogs', result.data.blogs)
          })
      }
    },
    computed: {
      blogs() {
        return this.$store.state.blog.blogs || []
      }
    },
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
    padding-top: 3%;
    width: 60%;
    margin: 0 auto;
  }

  .title {
    font-size: 24px;
    color: $black;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    text-decoration: none;
  }

  .title-container {
  }

  .blog-item-container {
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid $gray;
    line-height: 50px;
  }

</style>
