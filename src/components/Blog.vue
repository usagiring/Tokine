<template>
  <div id="blog">
    <div class="left-container">
      <div class="action-btn-group">
        <div class="action-button" @click="edit">
          <i class="fa fa-pencil icon-btn"></i>
          <span class="button-info">Edit</span>
        </div>
        <div class="action-button delete-btn" @click="removeBlog">
          <div v-if="!deleting">
            <i class="fa fa-trash icon-btn"></i>
            <span class="button-info">Delete</span>
          </div>
          <div v-else>
            <i class="fa fa-spinner fa-spin icon-btn"></i>
            <span class="button-info">Waiting...</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-html="blog.content"></div>
    </div>

  </div>
</template>

<script>
  import {get, remove} from '../utilities/rest'

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
        blog: {},
        deleting: false
      }
    },
    methods: {
      edit() {

      },
      removeBlog() {
        this.deleting = true
        remove(`/blog/${this.blog._id}`)
          .then(() => {
            this.$store.commit('removeBlog', this.blog)
            this.$router.replace('/blogs')
            this.deleting = false
            this.$message.success('delete success')
          })
      }
    },
    computed: {}
  }
</script>

<style scoped lang="scss">
  @import '../style/common/variables';

  .container {
    width: 80%;
    margin: 0 auto;
    padding-top: 3%;
  }

  .left-container {

  }

  .action-btn-group {
    position: fixed;

    transition: .5s width;
    width: 60px;
    height: auto;
    background: $extra-light-black;
    color: $white;

    &:hover {
      width: 150px;
    }
  }

  .action-button {
    position: relative;
    padding: 20px;

    &:hover {
      background: $light-blue;
    }
  }

  .button-info {
    font-size: 14px;
    position: absolute;
    left: 60px;
    top: 23px;

  }

  .delete-btn {
    background: $danger;

  }

  .icon-btn {
    font-size: 20px;
  }
</style>
