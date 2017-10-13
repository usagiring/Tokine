<template>
  <div id="new-blog">
    <div class="left-container">
    </div>
    <div class="mid-container">
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
      return {}
    },
    created() {
    },
    computed: {},
    methods: {
      publish() {
        let data = {
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

  .action-btn-group {
    position: fixed;

  }

  .mid-container {
    position: relative;
  }

  .editor-wrapper {
    position: relative;
    top: 0;
    left: 5%;
    width: 90%;
  }

  .action-button {
    background: $light-gray;
    font-size: 20px;
    padding: 20px;

    &:hover {
      background: $light-blue;
    }
  }

</style>
