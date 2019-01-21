<template>
  <div id="blogs">
    <div class="blog-container">
      <div v-for="blog in blogs" :key="blog._id">
        <div class="blog-item-container">
          <div class="title-container">
            <router-link class="title" :to="detail(blog)">
              <span>{{blog.title}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "blogs",
  apollo: {
    blogs: {
      query: gql`
        {
          blogs {
            _id
            title
          }
        }
      `
    }
  },
  data() {
    return {
      blogs: []
    };
  },
  computed: {},
  methods: {
    detail(blog) {
      return `/blogs/${blog._id}`;
    }
  }
};
</script>

<style scoped lang="scss">
.blog-container {
  padding-top: 3%;
  width: 60%;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  color: $black;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  text-decoration: none;
}

.blog-item-container {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid $gray;
  line-height: 50px;
}
</style>
