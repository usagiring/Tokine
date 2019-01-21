<template>
  <div id="blog">
    <div class="left-container">
      <div class="action-btn-group">
        <div v-if="!editMode" class="action-button" @click="edit">
          <i class="fa fa-pencil icon-btn"></i>
          <span class="button-info">Edit</span>
        </div>
        <div v-if="editMode" class="action-button" @click="edit">
          <i class="fa fa-undo icon-btn"></i>
          <span class="button-info">cancel</span>
        </div>
        <div v-if="!editMode" class="action-button delete-btn" @click="removeBlog">
          <div v-if="!deleting">
            <i class="fa fa-trash icon-btn"></i>
            <span class="button-info">Delete</span>
          </div>
          <div v-else>
            <i class="fa fa-spinner fa-spin icon-btn"></i>
            <span class="button-info">Waiting...</span>
          </div>
        </div>
        <div v-if="editMode" class="action-button" @click="update">
          <i class="fa fa-check icon-btn"></i>
          <span class="button-info">update</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-if="!editMode">
        <h1 class="title-container">{{blog.title}}</h1>
        <div v-html="blog.content"></div>
      </div>
      <div v-else>
        <div class="title-container">
          <Input class="title-input" v-model="title" placeholder="请输入标题"/>
        </div>
        <div class="editor-container">
          <html-editor :text="blog.content" ref="editor"></html-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, remove, put } from "@/utilities/rest";
import gql from "graphql-tag";

export default {
  name: "blog",
  apollo: {
    blog: {
      query: gql`
        query QueryBlog($_id: ObjectId!) {
          blog(_id: $_id) {
            _id
            title
            content
          }
        }
      `,
      variables() {
        return {
          _id: this.$route.params.id
        };
      }
    }
  },
  created() {},
  data() {
    return {
      _id: this.$route.params.id,
      blog: {},
      title: "",
      deleting: false,
      editMode: false
    };
  },
  methods: {
    edit() {
      this.editMode = !this.editMode;
    },
    removeBlog() {
      this.deleting = true;
      remove(`/blogs/${this.blog._id}`).then(() => {
        this.$store.commit("removeBlog", this.blog);
        this.$router.replace("/blogs");
        this.deleting = false;
        this.$Message.success("delete success");
      });
    },
    update() {
      let data = {
        title: this.title,
        content: this.$refs.editor.getHtml()
      };
      put(`/blogs/${this.blog._id}`, data).then(blog => {
        this.blog = blog;
        this.editMode = false;
      });
    },
    changeTitle(e) {
      console.log(e);
      //        this.title = e.target.value
    }
  },
  computed: {},
  components: {}
};
</script>

<style scoped lang="scss">
.container {
  width: 80%;
  margin: 0 auto;
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

.title-container {
  position: relative;
  top: 20px;
  text-align: center;
}

.editor-container {
  position: relative;
  top: 40px;
}
</style>
