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
        <el-input class="title-input" v-model="title" placeholder="请输入标题"></el-input>
      </div>

      <div class="editor-wrapper">
        <keep-alive>
          <component :is="currentEditor" ref="editor"/>
        </keep-alive>
      </div>
    </div>

    <el-dialog title="congratulation" :visible.sync="showSuccessDialog">
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

    <el-dialog :title="title" :visible.sync="showPreviewDialog" width="80%">
      <div v-html="html"></div>
    </el-dialog>
  </div>
</template>

<script>
import markdown from "@/components/markdown.vue";
import { post } from "@/utilities/rest";

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
        this.$message.error("please input title");
        return;
      }
      let data = {
        title: this.title,
        content: this.$refs.editor.getHtml()
      };
      let url = "/blogs";

      // let data = await post(url, data);
      // this.id = data._id;

      let res = await this.$apollo.mutate({
        // 查询语句
        mutation: gql`
            mutation($content: String!, title: String!) {
              addBlog(title: $title, content: $content) {
                _id
                title
                content
              }
            }
          `,
        // 参数
        variables: data
        // 用结果更新缓存
        // 查询将先通过乐观响应、然后再通过真正的变更结果更新
        // update: (store, { data: { addTag } }) => {
        //   // 从缓存中读取这个查询的数据
        //   const data = store.readQuery({ query: TAGS_QUERY });
        //   // 将变更中的标签添加到最后
        //   data.tags.push(addTag);
        //   // 将数据写回缓存
        //   store.writeQuery({ query: TAGS_QUERY, data });
        // },
        // 乐观 UI
        // 将在请求产生时作为“假”结果，使用户界面能够快速更新
        // optimisticResponse: {
        //   __typename: "Mutation",
        //   addTag: {
        //     __typename: "Tag",
        //     id: -1,
        //     label: newTag
        //   }
        // }
      });
      // 结果
      console.log(res);

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
