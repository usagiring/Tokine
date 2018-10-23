<template>
  <div id="sign-in" class="sign-in-wrapper">
    <div class="container">
      <div class="title">登录</div>
      <Input class="input-label" v-model="username" placeholder="Username" icon="fa-user" autofocus/>
      <Input class="input-label" type="password" v-model="password" placeholder="Password" icon="fa-key"/>
      <div>
        <Button class="sign-in-btn" type="primary" @click="signIn" :disabled="!validate">登录</Button>
        <a :href="githubAuthUrl"><Icon class="logo" type="logo-github" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "../utilities/rest";
import { baseAPI } from "../../config/baseAPI";

export default {
  name: "sign-in",
  data: () => {
    return {
      username: "",
      password: "",
      githubAuthUrl: ""
    };
  },
  computed: {
    validate() {
      return this.username && this.password;
    }
  },
  methods: {
    async signIn(e) {
      try {
        let user = await post("/sign-in", {
          username: this.username,
          password: this.password
        });
        this.$store.commit("setUser", user);
        this.$router.push("/");
      } catch (e) {
        this.$Message.error(e.response.data.message);
      }
    }
  },
  async created() {
    this.githubAuthUrl = `${baseAPI}/oauth/github`;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
}

.sign-in-wrapper {
  padding-top: 10%;
  height: 100%;
  background: rgba(243, 243, 243, 0.05); // 登录页背景
}

.container {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #ffffff;
}

.input-label {
  margin-top: 10px;
  background-color: transparent; // 透明
}

.sign-in-btn {
  margin-top: 10px;
  width: 300px;
}

.logo {
  font-size: 36px;
}
</style>
