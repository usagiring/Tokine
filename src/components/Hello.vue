<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>欢迎来到其妙的个人空间，你可以</h3>
    <router-link to="/chat-room">去聊天</router-link>
    <router-link to="/blogs">看博客</router-link>
    <router-link to="/blog-new">写博客</router-link>
    <router-link to="/three">3D模型预览</router-link>
    <router-link to="/calculator">幻想神域伤害计算器</router-link>
    <h5><s>我火舞烙影劝你们谨言慎行</s></h5>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {};
  },
  computed: {
    toProfile() {
      return `${this.$store.state.user.username}/profile`;
    },
    msg() {
      if (this.$store.state.user.username) {
        return `Hello ${this.$store.state.user.username}`;
      } else {
        return "Hello World";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  font-size: 50px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
</style>
