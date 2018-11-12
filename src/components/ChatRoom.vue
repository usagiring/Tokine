<template>
  <div class="demo-split">
      <Split v-model="split3">
        <div slot="left" class="demo-split-pane no-padding">
          <Split v-model="split4" mode="vertical" max="40px">
            <div slot="top" class="demo-split-pane">
              <p v-for="msg in messages" :key="msg">
                {{msg}}
              </p> 
            </div>
            <div slot="bottom" class="chat-message-input">
                <Input v-model="chatInput" type="textarea" placeholder="Enter something..." @on-enter="send"/>
            </div>
          </Split>
        </div>
        <div slot="right" class="">
          <CellGroup>
            <Cell v-for="user in users" :key="user._id">
              <Avatar :icon="defaultAvatar"></Avatar>
              {{user.username}}
            </Cell>
          </CellGroup>
        </div>
      </Split>
        
    <!-- <ul id="messages"></ul>
    <div class="input-group">
      <input id="m" autocomplete="off"/>
      <button @click="send">Send</button>
    </div> -->
  </div>
</template>

<script>
import $ from "jquery";
import io from "socket.io-client";
import { server } from "../../config/baseAPI";

const socket = io(server);

export default {
  name: "chat-room",
  data() {
    return {
      messages: [],
      chatInput: "",
      defaultAvatar: "md-help",
      users: [],
      split3: 0.75,
      split4: 0.75
    };
  },
  methods: {
    send(e) {
      e.preventDefault();
      socket.emit("chat-message", this.chatInput);
      this.chatInput = ''
    }
  },
  created() {
    socket.on("chat-message", msg => {
      this.messages.push(msg)
    });

    socket.on("user-connected", msg => {
      this.messages.push(msg)
    });

    socket.on("users", users => {
      console.log(users);
      this.users = users;
    });

    socket.emit("user-connected", {
      username: this.$store.state.user.username
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-split {
  height: 100%;
  border: 7px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}

.chat-message-input {
  padding-top: 6px;
}

.demo-split-pane.no-padding {
  height: 100%;
  padding: 0;
}
</style>
