<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>欢迎来到其妙的个人空间，你可以</h3>
    <router-link class="link" to="/chat-room">去聊天</router-link>
    <router-link class="link" to="/blogs">看博客</router-link>
    <router-link class="link" to="/blog-new">写博客</router-link>
    <router-link class="link" to="/three">3D模型预览</router-link>
    <router-link class="link" to="/calculator">幻想神域伤害计算器</router-link>
    <router-link class="link" to="/qrcode">二维码生产器</router-link>
    <router-link class="link" to="/lottery">双色球概率</router-link>
    <h5>
      <s>我火舞烙影劝你们谨言慎行</s>
    </h5>
    <!-- <h5>本地时间： {{ time }}</h5>
    <h5>服务器时间： {{ serverTime }}</h5>
    <h5>stauts： {{status }}</h5> -->
  </div>
</template>

<script>
const { get } = require("../utilities/rest");
export default {
  name: "hello",
  data() {
    return {
      time: null,
      serverTime: null
    };
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
    },
    status(){
      if(`${this.serverTime}` === '99999999999999'){
        return 'success!!!!'
      }else{
        return 'failure!!!!'
      }
    }
  }
  // mounted() {
  //   let self = this;
  //   requestAnimationFrame(time);
  //   setInterval(async () => {
  //     const time = await get("/time");
  //     self.serverTime = time;
  //   }, 500);

  //   function time() {
  //     self.time = Date.now();
  //     requestAnimationFrame(time);
  //   }
  // }
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
.link {
  display: block;
}
</style>
