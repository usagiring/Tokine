<template>
  <div class="app-nav">
    <div class="logo-container" @click="toHome">
      <span>ToKiNe</span>
    </div>
    <div class="sign-btn-group" v-if="user.username">
      <Dropdown trigger="click">
        <div class="avatar-container">
          <Avatar v-if="user.avatar" :src="avatarSrc"></Avatar>
          <Avatar v-else :icon="defaultAvatar"></Avatar>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem>
            <Button type="text">{{ user.username }}</Button>
          </DropdownItem>
          <DropdownItem divided>
            <Button type="text" @click="toProfile">设置</Button>
          </DropdownItem>
          <DropdownItem>
            <Button @click="signOut" type="text">退出</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="sign-btn-group" v-if="!user.username">
      <router-link class="sign-btn" to="/sign-in">登录</router-link>
      <router-link class="sign-btn" to="/sign-up">注册</router-link>
    </div>
  </div>
</template>

<script>
import baseAPI from "../../config/baseAPI";
import { timeout } from "../utilities/tools";

export default {
  name: "app-nav",
  data() {
    return {
      defaultAvatar: "md-help"
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    avatarSrc() {
      return `${baseAPI}/file/${this.$store.state.user.avatar}`;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.replace("/");
    },
    toProfile() {
      this.$router.replace(`${this.user.username}/profile`);
    },
    toHome() {
      this.$router.replace(`/`);
    },
    async noAvatarInfo() {
      await timeout(3000);
      this.$Message.info("你怎么没有头像呀？");
      await timeout(2000);
      this.$Message.info("你怎么回事小老弟？");
      await timeout(3000);
      this.$Message.info("什么？你说注册的时候不能设置头像？");
      await timeout(3000);
      this.$Message.error("那你不会现在就去设置吗？");
      await timeout(3000);
      this.$Message.info("什么？设置页面有BUG？");
      await timeout(1000);
      this.$Message.error("闭嘴。");
      await timeout(3000);
      this.$Message.success("帮你搞个蝴蝶结吧，怎么样。");
      this.defaultAvatar = "ios-bowtie";
    }
  },
  created() {
    let user = this.$store.state.user;
    if (user._id && !user.avatar) {
      this.noAvatarInfo();
    }
  }
};
</script>

<style scoped lang="scss">
.app-nav {
  position: relative;
  height: 40px;
  background: $pink;
}

.logo-container {
  position: absolute;
  left: 50px;
  line-height: 40px;
  cursor: pointer;

  color: $white;
  font-weight: bold;
  font-size: 20px;
}

.sign-btn-group {
  position: absolute;
  right: 50px;
  line-height: 40px;
}

.sign-btn {
  font-size: 16px;
  color: $white;

  padding-right: 10px;

  &:hover {
    text-decoration: underline;
  }
}

.avatar-container :hover {
  background: $light-blue;
}

.username {
  color: $white;
  font-weight: bold;
}

.sign-out-btn {
  color: $white;
  font-size: large;
  margin-right: 20px;

  &:hover {
    text-decoration: underline;
  }
}
</style>
