<template>
  <div id="new-blog">
    <div class="left-container">
      <div class="action-btn-group">
        <div class="action-button" @click="publish">
          <i class="el-icon-fa-send"></i>
        </div>
        <div class="action-button">
          <i class="el-icon-fa-eye"></i>
        </div>
        <div class="action-button">
          <i class="el-icon-fa-bookmark"></i>
        </div>
      </div>
    </div>
    <div class="mid-container">

      <div class="title-container">
        <el-input class="title-input" v-model="title" placeholder="请输入标题"></el-input>
      </div>

      <div class="editor-wrapper">
        <editor v-on:html="getHtml"></editor>
      </div>

    </div>
  </div>
</template>

<script>
  import editor from './WYSIWYG.vue'
  import {post} from '../utilities/rest'

  export default {
    name: 'new-blog',
    data() {
      return {
        title: ''
      }
    },
    created() {
    },
    computed: {},
    methods: {
      publish() {
        let data = {
          title: this.title,
          content: this.$store.state.blog.content
        }
        let url = '/blog'
        post(url, data)
          .then(data => {
            console.log(data)
          })
      },
      getHtml(data) {
        console.log(data)
      }
    },
    components: {
      editor
    }
  }
</script>

<style scoped lang="scss">
  @import '../style/common/variables';

  #new-blog {
  }

  .action-btn-group {
    position: fixed;
  }

  .mid-container {
    position: relative;
    margin: 0 auto;
    width: 90%;
  }

  .editor-wrapper {
    position: relative;
    top: 40px;
  }

  .action-button {
    background: $extra-light-black;
    color: $white;
    font-size: 20px;
    padding: 20px;

    &:hover {
      background: $light-blue;
    }
  }

  .title-container {
    position: relative;
    top: 20px;
  }

  .title-input {

  }

</style>
