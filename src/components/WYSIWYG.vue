<template>
  <div id="wysiwyg">
    <div class="container">
      <div class="icon-container">
        <i class="el-icon-fa-bold" @click="bold" @mousedown="prevent"></i>
        <i class="el-icon-fa-italic" @click="italic" @mousedown="prevent"></i>
        <i class="el-icon-fa-strikethrough" @click="strikeThrough" @mousedown="prevent"></i>
        <i class="el-icon-fa-underline" @click="underline" @mousedown="prevent"></i>
        <i class="el-icon-fa-font" @click="showFontOptions"></i>

        <i class="el-icon-fa-align-left"></i>
        <i class="el-icon-fa-align-center"></i>
        <i class="el-icon-fa-align-right"></i>
        <i class="el-icon-fa-align-justify"></i>

        <i class="el-icon-fa-list"></i>
      </div>
      <div class="option-container">
        <div v-if="showFont">
          <span>font: </span>
          <select title="font" @change="selectFont">
            <option value="黑体">黑体</option>
            <option value="微软雅黑">微软雅黑</option>
            <option value="Arial">Arial</option>
          </select>
          <span>size: </span>
          <select title="size" @change="selectFont">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <span>color: </span>
          <input type="text" id="spectrum" title="spectrum"/>
        </div>
      </div>
    </div>
    <div class="text-container">
      <div contenteditable class="text-area">
      </div>

    </div>

  </div>
</template>

<script>
  // 加色轮
  //  import spectrum from '../../node_modules/spectrum-colorpicker/spectrum.js'
  //  $('#spectrum').spectrum({
  //    color: '#f00'
  //  })

  export default {
    name: 'wysiwyg',
    data() {
      return {
        html: '',
        showFont: false
      }
    },
    computed: {},
    created() {
      document.execCommand('styleWithCSS', false, null)
    },
    methods: {
      prevent(e) {
        e.preventDefault()
      },
      showFontOptions() {
        this.showFont = !this.showFont
      },
      selectFont(e) {
        console.log(e)
        if (e.target.title === 'font') {
          this.fontName(e.target.value)
        } else if (e.target.title === 'size') {
          this.fontSize(e.target.value)
        } else if (e.target.title === 'color') {
          this.foreColor(e.target.value)
        }
      },
      bold() {
        document.execCommand('bold', false, null)
      },
      italic() {
        document.execCommand('italic', false, null)
      },
      strikeThrough() {
        document.execCommand('strikeThrough', false, null)
      },
      underline() {
        document.execCommand('underline', false, null)
      },
      removeFormat() {
        document.execCommand('removeFormat', false, null)
      },
      subscript() {
        // 下角标
      },
      superscript() {
        // 上角标
      },
      foreColor(color) {
        document.execCommand('foreColor', false, color)
      },
      fontName(font) {
        document.execCommand('fontName', false, font)
      },
      hiliteColor(color) {
        document.execCommand('hiliteColor', false, color)
      },
      fontSize(size) {
        // 在插入点或者选中文字部分修改字体大小. 需要提供一个HTML字体尺寸 (1-7) 作为参数。
        document.execCommand('fontSize', false, size)
      },
      formatBlock() {

      },
      justifyCenter() {

      },
      justifyFull() {

      },
      justifyLeft() {

      },
      justifyRight() {

      },
      redo() {

      },
      undo() {

      },
      unlink() {

      },
      createLink() {

      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../style/common/variables';

  .container {
    border: 1px solid $black;
    width: 500px;
  }

  .icon-container {
    border-bottom: 1px solid $extra-light-black;
    > i {
      margin: 5px;
      cursor: pointer;
    }
  }

  .option-container {
    height: 40px;
  }

  .text-container {
    position: relative;
    height: 500px;
  }

  .text-area-container {

  }

  .text-area {
    position: absolute;
    top: 0;
    left: 10px;
    right: 10px;
    bottom: 0;

    font-size: 14px;
    border: none;
  }
</style>
