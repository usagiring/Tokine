<template>
  <div class="qr-code">
    <p class="title">二维码生成器</p>
    <div class="qr-container">
      <Input v-model="qrcode" class="qr-input"/>
      <Button class="qr-button" @click="generateQRCode">生成</Button>
    </div>
    <div class="qr-wrapper">
      <canvas id="qr-code"></canvas>
    </div>
  </div>
</template>

<script>
import baseAPI from "../../config/baseAPI";
import { timeout } from "../utilities/tools";
import QRCode from "qrcode";

export default {
  name: "qrcode",
  data() {
    return {
      qrcode: "请输入"
    };
  },
  methods: {
    generateQRCode() {
      const canvas = document.getElementById("qr-code");

      QRCode.toCanvas(canvas, this.qrcode, function(error) {
        if (error) console.error(error);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.qr-container {
  width: 50%;
  margin: 0 auto;
}
.qr-input {
  width: 85%;
}
.qr-button {
  width: 10%;
}
.qr-wrapper {
  text-align: center;
}
</style>