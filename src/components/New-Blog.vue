<template>
  <div id="new-blog">
    <div class="left-container">
      <div class="action-btn-group">
        <div class="action-button" @click="publish">
          <i class="fa fa-send"></i>
        </div>
        <div class="action-button">
          <i class="fa fa-eye"></i>
        </div>
        <div class="action-button">
          <i class="fa fa-bookmark"></i>
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

    <el-dialog
      title="congratulation"
      :visible.sync="showSuccessDialog">
      <div class="icon-container">
        <i class="fa fa-check"></i>
      </div>
      <div class="info-container">
        <p>publish success</p>
        <p>go to view?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSuccessDialog = false">cancel</el-button>
        <el-button type="primary" @click="goToViewBlog">yes</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import editor from './WYSIWYG.vue'
  import {post} from '../utilities/rest'

  export default {
    name: 'new-blog',
    data() {
      return {
        title: '',
        showSuccessDialog: false,
        id: ''
      }
    },
    created() {
    },
    computed: {},
    methods: {
      publish() {
        if (!this.title) {
          this.$message.error('please input title')
          return
        }
        let data = {
          title: this.title,
          content: this.$store.state.blog.content
        }
        let url = '/blog'
        post(url, data)
          .then(data => {
            console.log(data)
            this.id = data._id
            this.showSuccessDialog = true
          })
      },
      getHtml(data) {
        console.log(data)
      },
      goToViewBlog() {
        this.$router.push(`/blog/${this.id}`)
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

  .icon-container {
    display: inline-block;

    > i {
      font-size: 36px !important;
      color: green;
    }
  }

  .info-container {
    display: inline-block;
  }
</style>
