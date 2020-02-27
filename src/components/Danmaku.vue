<template>
  <div class="main">
    <div class="input-wrapper">
      <Input id="room-id-input" v-model="roomId" placeholder="请输入房间号" number type="number" />
      <Button id="connect-button" type="primary" @click="connect" :loading="loading">连接</Button>
      <Button id="connect-button" @click="disconnect">断开</Button>
    </div>
    <Input
      id="keyword-input-area"
      v-model="keyText"
      type="textarea"
      :rows="5"
      placeholder="输入关键字，回车分隔"
    />
    <Button id="watch-button" type="primary" @click="startWatch">开始</Button>
    <Button id="watch-button" @click="stopWatch">停止</Button>
    <Button id="watch-button" @click="showUsers">有效用户</Button>
    <div id="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

const URI = "wss://broadcastlv.chat.bilibili.com:2245/sub";
let ws;
let HEART_BEAT_TIMER = null;
let chart;
let keywords;
let data;
let userMap = {};

const wsBinaryHeaderList = [
  {
    name: "Header Length",
    key: "headerLen",
    bytes: 2,
    offset: 4,
    value: 16
  },
  {
    name: "Protocol Version",
    key: "ver",
    bytes: 2,
    offset: 6,
    value: 1
  },
  {
    name: "Operation",
    key: "op",
    bytes: 4,
    offset: 8,
    value: 1
  },
  {
    name: "Sequence Id",
    key: "seq",
    bytes: 4,
    offset: 12,
    value: 1
  }
];

function stringToByte(str) {
  var bytes = [];
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0);
      bytes.push(((c >> 12) & 0x3f) | 0x80);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0);
      bytes.push((c & 0x3f) | 0x80);
    } else {
      bytes.push(c & 0xff);
    }
  }
  return bytes;
}

function convertToObject(arraybuffer) {
  let dataview = new DataView(arraybuffer);
  let output = {
    body: []
  };
  output.packetLen = dataview.getInt32(0);

  wsBinaryHeaderList.forEach(function(item) {
    4 === item.bytes
      ? (output[item.key] = dataview.getInt32(item.offset))
      : 2 === item.bytes && (output[item.key] = dataview.getInt16(item.offset));
  });

  output.packetLen < arraybuffer.byteLength &&
    convertToObject(arraybuffer.slice(0, output.packetLen));

  let decoder = getDecoder();

  if (output.op && 5 === output.op) {
    for (
      let i = 0, o = output.packetLen, u = "", c = "";
      i < arraybuffer.byteLength;
      i += o
    ) {
      o = dataview.getInt32(i);
      u = dataview.getInt16(i + 4);
      try {
        if (output.ver === 2) {
          const l = arraybuffer.slice(i + u, i + o);
          const f = new Uint8Array(l);
          c = convertToObject(f.buffer).body;
        } else {
          c = JSON.parse(decoder.decode(arraybuffer.slice(i + u, i + o)));
        }
        c && output.body.push(c);
      } catch (t) {
        console.error(
          "decode body error:",
          new Uint8Array(arraybuffer),
          output,
          t
        );
      }
    }
  } else {
    // 人气值
    output.op &&
      3 === output.op &&
      (output.body = {
        count: dataview.getInt32(16)
      });
  }
  return output;
}

function convertToArrayBuffer(data, t) {
  var encoder = getEncoder();
  var buffer = new ArrayBuffer(16);
  var dataview = new DataView(buffer, 0);
  var encode = encoder.encode(data);

  return (
    dataview.setInt32(0, 16 + encode.byteLength),
    (wsBinaryHeaderList[2].value = t),
    wsBinaryHeaderList.forEach(function(e) {
      4 === e.bytes
        ? dataview.setInt32(e.offset, e.value)
        : 2 === e.bytes && dataview.setInt16(e.offset, e.value);
    }),
    mergeArrayBuffer(buffer, encode)
  );
}

function mergeArrayBuffer(e, t) {
  const n = new Uint8Array(e);
  const i = new Uint8Array(t);
  const r = new Uint8Array(n.byteLength + i.byteLength);
  r.set(n, 0);
  r.set(i, n.byteLength);
  return r.buffer;
}

function getDecoder() {
  return window.TextDecoder
    ? new window.TextDecoder()
    : {
        decode: function(e) {
          return decodeURIComponent(
            window.escape(String.fromCharCode.apply(String, new Uint8Array(e)))
          );
        }
      };
}

function getEncoder() {
  return window.TextEncoder
    ? new window.TextEncoder()
    : {
        encode: function(e) {
          for (
            var t = new ArrayBuffer(e.length),
              n = new Uint8Array(t),
              i = 0,
              r = e.length;
            i < r;
            i++
          ) {
            n[i] = e.charCodeAt(i);
          }
          return t;
        }
      };
}

function heartBeat() {
  clearInterval(HEART_BEAT_TIMER);
  HEART_BEAT_TIMER = setInterval(function() {
    let t = convertToArrayBuffer({}, 2);
    ws.send(t);
  }, 30000);
}

function makeChart(keywords, data) {
  chart.setOption({
    tooltip: {},
    xAxis: {},
    yAxis: {
      data: keywords
    },
    series: [
      {
        name: "计数",
        type: "bar",
        data: data
      }
    ]
  });
}

export default {
  name: "danmaku",
  data() {
    return {
      roomId: null,
      keyText: "",
      isWatching: false,
      loading: false
    };
  },
  computed: {
    statusMsg() {
      if (!ws) return "未连接";
      if (ws.readyState === 0) {
        return "未连接";
      } else if (ws.readyState === 1) {
        return "已连接";
      } else {
        return "已断开";
      }
    }
  },
  methods: {
    connect() {
      const self = this;

      if (!this.roomId) {
        return self.$Message.error("请输入房间号");
      }
      console.log(this.roomId);
      const roomId = Number(this.roomId);

      if (ws && ws.readyState === 1) {
        return self.$Message.success("连接成功");
      }
      this.loading = true;

      ws = new WebSocket(URI);
      ws.binaryType = "arraybuffer";

      const authParams = {
        uid: 0,
        roomid: roomId,
        protover: 1,
        platform: "web",
        clientver: "1.4.0"
      };

      ws.onopen = function() {
        const data = JSON.stringify(authParams);
        const byte = convertToArrayBuffer(data, 7);
        ws.send(byte);
        self.$Message.success("连接成功");
        self.loading = false;
      };

      ws.onmessage = function(evt) {
        const result = convertToObject(evt.data);

        result.body.forEach &&
          result.body.forEach(function(item) {
            if (item.cmd === "DANMU_MSG") {
              const msg = item.info[1];
              const [uid, name] = item.info[2];
              console.log(`${name}: ${msg}`);
              if (!self.isWatching) return;
              if (!keywords || !keywords.length) return;
              if (!chart) return;

              if (userMap[uid]) return;
              const regexps = keywords.map(keyword => new RegExp(keyword, "i"));
              const index = regexps.findIndex(regexp => {
                return !!~msg.search(regexp);
              });
              if (!~index) return;

              userMap[uid] = name;
              data[index]++;
              makeChart(keywords, data);
            }
          });

        if (result.op === 8) {
          heartBeat();
        }
      };

      ws.onclose = function() {
        console.log("ws closed.");
        self.$Message.error("连接断开");
        self.loading = false;
      };

      ws.onerror = function(err) {
        console.log("ws error:", err);
        self.$Message.error("连接断开");
        self.loading = false;
      };
    },
    disconnect() {
      if (!ws) return;
      ws.close();
    },
    startWatch() {
      keywords = this.keyText.split(/\n/g);
      if (chart) {
        chart = null;
      }
      chart = echarts.init(document.getElementById("chart"));
      data = keywords.map(_ => 0);
      makeChart(keywords, []);
      userMap = {};
      this.$Message.info("开始统计弹幕");
      this.isWatching = true;
    },
    stopWatch() {
      this.$Message.info("统计停止");
      this.isWatching = false;
    },
    showUsers() {
      this.$Modal.confirm({
        render: h => {
          const names = Object.values(userMap);

          return h(
            "div",
            names.map(name => {
              return h("p", name);
            })
          );
        }
      });
    }
  },
  created() {
    console.log("danmaku");
  }
};
</script>


<style scoped>
#chart {
  width: 800px;
  height: 400px;
}
.input-wrapper {
  margin: 20px 0 0 20px;
}
#room-id-input {
  display: inline-block;
  width: 200px;
}
#connect-button {
  margin-left: 20px;
}
#keyword-input-area {
  width: 200px;
  margin: 10px 0 0 20px;
}
#watch-button {
  margin-left: 20px;
}
</style>
