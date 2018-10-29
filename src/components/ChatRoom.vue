<template>
  <div>
    <ul id="messages"></ul>
    <div class="input-group">
      <input id="m" autocomplete="off"/>
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import io from 'socket.io-client'
  import {server} from '../../config/baseAPI'

  const socket = io(server)

  socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
  });

  export default {
    name: 'chat-room',
    data() {
      return {}
    },
    methods: {
      send(e) {
        e.preventDefault()
        socket.emit('chat message', $('#m').val());
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font: 13px Helvetica, Arial;
  }

  .input-group {
    background: #000;
    padding: 3px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .input-group input {
    border: 0;
    padding: 10px;
    width: 90%;
    margin-right: .5%;
  }

  .input-group button {
    width: 9%;
    background: rgb(130, 224, 255);
    border: none;
    padding: 10px;
  }

  #messages {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  #messages li {
    padding: 5px 10px;
  }

  #messages li:nth-child(odd) {
    background: #eee;
  }
</style>
