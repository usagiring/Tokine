<template>
  <div id="wysiwyg">
    <div class="container">
      <div class="icon-container">
        <span :class="{active: boldIsActive}" @click="bold" @mousedown="prevent">
                  <i class="el-icon-fa-bold"></i>
        </span>
        <span :class="{active: italicIsActive}" @click="italic" @mousedown="prevent">
                  <i class="el-icon-fa-italic" @click="italic" @mousedown="prevent"></i>
        </span>
        <span :class="{active: strikeThroughIsActive}" @click="strikeThrough" @mousedown="prevent">
                  <i class="el-icon-fa-strikethrough"></i>
        </span>
        <span :class="{active: underlineIsActive}" @click="underline" @mousedown="prevent">
                  <i class="el-icon-fa-underline"></i>
        </span>
        <span :class="{active: showFont}" @click="showFontOptions">
                  <i class="el-icon-fa-font"></i>
        </span>
        <span>
                  <i class="el-icon-fa-align-left"></i>
        </span>
        <span>
                  <i class="el-icon-fa-align-center"></i>
        </span>
        <span>
                  <i class="el-icon-fa-align-right"></i>
        </span>
        <span>
                  <i class="el-icon-fa-align-justify"></i>
        </span>
        <span>
                  <i class="el-icon-fa-list"></i>
        </span>
      </div>
      <div class="option-container">
        <div class='font-options' v-if="showFont">
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
          <!--<span>color: </span>-->
          <!--<input type="text" id="spectrum" title="spectrum"/>-->
        </div>
      </div>
      <div class="text-container">
        <div contenteditable class="text-area" id="text-area" @mouseup="onSelection">
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  //  // 加色轮
  //  import '../../node_modules/spectrum-colorpicker/spectrum.js'
  //
  //  console.log($('#spectrum'))

  export default {
    name: 'wysiwyg',
    data() {
      return {
        boldIsActive: false,
        italicIsActive: false,
        strikeThroughIsActive: false,
        underlineIsActive: false,

        showFont: false
      }
    },
    computed: {},
    created() {
      document.execCommand('styleWithCSS', false, null)
    },
    mounted() {

      // focus
      let p = document.getElementById('text-area')
      let s = window.getSelection()
      let r = document.createRange();
      r.setStart(p, 0);
      r.setEnd(p, 0);
      s.removeAllRanges();
      s.addRange(r);
    },
    methods: {
      prevent(e) {
        e.preventDefault()
      },
      showFontOptions() {
        this.showFont = !this.showFont
      },
      selectFont(e) {
        if (e.target.title === 'font') {
          this.fontName(e.target.value)
        } else if (e.target.title === 'size') {
          this.fontSize(e.target.value)
        } else if (e.target.title === 'color') {
          this.foreColor(e.target.value)
        }
      },
      bold() {
        let result = document.execCommand('bold', false, null)
        if (result) {
          this.boldIsActive = !this.boldIsActive
        }
      },
      onSelection() {
        let styles = ''
        let parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode
        if (parentNode.id === 'text-area') {
          this.boldIsActive = false
          this.italicIsActive = false
        } else {
          fillActive(parentNode)
          styles.includes('bold') ? this.boldIsActive = true : this.boldIsActive = false
          styles.includes('italic') ? this.italicIsActive = true : this.italicIsActive = false
        }

        function fillActive(node) {
          if (!node.getAttribute) return
          let style = node.getAttribute('style')
          if (style) {
            styles += style
          }
          if (node.parentNode.id !== 'text-area') {
            fillActive(node.parentNode)
          }
        }
      },
      italic() {
        let result = document.execCommand('italic', false, null)
        if (result) {
          this.italicIsActive = !this.italicIsActive
        }
      },
      strikeThrough() {
        let result = document.execCommand('strikeThrough', false, null)
        if (result) {
          this.strikeThroughIsActive = !this.strikeThroughIsActive
        }
      },
      underline() {
        let result = document.execCommand('underline', false, null)
        if (result) {
          this.underlineIsActive = !this.underlineIsActive
        }
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
    min-width: 300px;
    min-height: 200px;
  }

  .icon-container {
    border-bottom: 1px solid $extra-light-black;
    > span {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;

      padding: 5px;
      cursor: pointer;
      text-align: center;
    }
  }

  .active {
    background: $gray;
  }

  .option-container {
    position: relative;
    height: 40px;
  }

  .text-container {
    position: relative;
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

    &:focus {
      outline: none;
    }
  }

  .font-options {
    padding: 10px;
  }
</style>
