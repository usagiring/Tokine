<template>
  <div id="new-blog">
    <div class="left-container">
      <div class="action-btn-group">
        <div class="action-button" @click="publish">
          <i class="fa fa-send"></i>
          <span class="button-info">Publish</span>
        </div>
        <div class="action-button" @click="preview">
          <i class="fa fa-eye"></i>
          <span class="button-info">Preview</span>
        </div>
        <div class="action-button">
          <i class="fa fa-bookmark"></i>
        </div>
        <div class="action-button" @click="changeEditor">
          <div v-show="currentEditor === 'html-editor'">
            <span class="fake-icon-markdown">MD</span>
            <span class="button-info">Markdown</span>
          </div>
          <div v-show="currentEditor === 'markdown'">
            <i class="fa fa-html5"></i>
            <span class="button-info">RichText</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mid-container">
      <div class="title-container">
        <Input class="title-input" v-model="title" placeholder="请输入标题"/>
      </div>

      <div class="editor-wrapper">
        <keep-alive>
          <component :is="currentEditor" ref="editor"/>
        </keep-alive>
      </div>
    </div>

    <Modal title="congratulation" :value="showSuccessDialog">
      <div class="icon-container">
        <i class="fa fa-check"></i>
      </div>
      <div class="info-container">
        <p>发布成功</p>
        <p>去查看？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <Button @click="showSuccessDialog = false">取消</Button>
        <Button type="primary" @click="goToViewBlog">确定</Button>
      </span>
    </Modal>

    <Modal :title="title" :value="showPreviewDialog" width="80%">
      <div v-html="html"></div>
    </Modal>
  </div>
</template>

<script>
import markdown from "@/components/markdown.vue";
import gql from "graphql-tag";

export default {
  name: "new-blog",
  data() {
    return {
      title: "",
      showSuccessDialog: false,
      showPreviewDialog: false,
      id: "",
      currentEditor: "html-editor",
      html: ""
    };
  },
  created() {},
  computed: {},
  methods: {
    async publish() {
      if (!this.title) {
        this.$Message.error("please input title");
        return;
      }
      let data = {
        title: this.title,
        content: this.$refs.editor.getHtml()
      };
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation($content: String!, $title: String!) {
            addBlog(title: $title, content: $content) {
              _id
              title
              content
            }
          }
        `,
        variables: data
      });
      this.showSuccessDialog = true;
    },
    goToViewBlog() {
      this.$router.push(`/blogs/${this.id}`);
    },
    changeEditor() {
      if (this.currentEditor === "html-editor") {
        this.currentEditor = "markdown";
      } else {
        this.currentEditor = "html-editor";
      }
    },
    preview() {
      this.showPreviewDialog = true;
      this.html = this.$refs.editor.getHtml();
    }
  },
  components: {
    markdown
  }
};
</script>

<style scoped lang="scss">
#new-blog {
  background: $white;
}

.action-btn-group {
  position: fixed;

  transition: 0.5s width;
  width: 60px;
  height: auto;
  background: $extra-light-black;
  color: $white;

  &:hover {
    width: 150px;
  }
}

.mid-container {
  position: relative;
  margin: 0 auto;
  width: 80%;
}

.editor-wrapper {
  position: relative;
  top: 40px;
}

.action-button {
  position: relative;
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

.fake-icon-markdown {
  font-size: 12px;
}

.button-info {
  font-size: 14px;
  position: absolute;
  left: 60px;
  top: 23px;
}
</style>
