<template>
  <div class="sign-up-wrapper">
    <div class="container">
      <div class="title">注册</div>
      <Input class='input' v-model="username" placeholder="Username" icon="fa-user" autofocus/>
      <Input class='input' type="password" v-model="password" placeholder="Password" icon="fa-key"/>
      <Input class='input' type="password" v-model="replyPassword" placeholder="Reply Password" icon="fa-key"/>
      <span class="err" v-if="!isPwdPass">输入密码不一致</span>
      <Input class='input' v-model="email" placeholder="Email" icon="fa-envelope"/>
      <Input class='input' v-model="phone" placeholder="Phone" icon="fa-phone"/>
      <div>
        <Button class="sign-up-btn" type="primary" @click.prevent="signUp" :disabled="!validate">注册</Button>
      </div>
    </div>
  </div>

</template>

<script>
import { post } from "../utilities/rest";

export default {
  name: "sign-up",
  data: () => ({
    username: null,
    password: null,
    replyPassword: null,
    email: null,
    phone: null
  }),
  computed: {
    isFilled() {
      return !!(this.username && this.password && this.replyPassword);
    },
    isPwdPass() {
      if (!this.replyPassword) return true;
      if (this.password && !this.replyPassword) return false;
      return this.password === this.replyPassword;
    },
    validate() {
      return this.isFilled && this.isPwdPass;
    }
  },
  methods: {
    async signUp() {
      let user = await post("/sign-up", {
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone
      });
      this.$store.commit("setUser", user);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/common/variables";

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.sign-up-wrapper {
  padding-top: 10%;
  height: 100%;
}

.container {
  position: relative;
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ffffff;
}

.input {
  margin-top: 10px;
}

.sign-up-btn {
  margin-top: 10px;
  width: 300px;
}

.err {
  position: relative;
  top: 6px;
  left: 12px;
  color: $danger;
  font-size: 12px;
}
</style>
