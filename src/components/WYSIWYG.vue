<template>
  <div id="wysiwyg">
    <div class="container">
      <div class="icon-container">
        <div class="icon-group">
          <span :class="{active: boldIsActive}" @click="bold" @mousedown="prevent"><i
            class="el-icon-fa-bold"></i></span>
          <span :class="{active: italicIsActive}" @click="italic" @mousedown="prevent"><i class="el-icon-fa-italic"
                                                                                          @click="italic"
                                                                                          @mousedown="prevent"></i></span>
          <span :class="{active: strikeThroughIsActive}" @click="strikeThrough" @mousedown="prevent"><i
            class="el-icon-fa-strikethrough"></i></span>
          <span :class="{active: underlineIsActive}" @click="underline" @mousedown="prevent"><i
            class="el-icon-fa-underline"></i></span>
          <span class="font-btn-wrapper" :class="{active: showFont}" @click="showFontOptions">
            <i class="el-icon-fa-font"></i>
            <span v-if="showFont" class="font-options">
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
            </span>
          </span>
          <span :class="{active: justifyLeftIsActive}" @click="justifyLeft" @mousedown="prevent"><i
            class="el-icon-fa-align-left"></i></span>
          <span :class="{active: justifyCenterIsActive}" @click="justifyCenter" @mousedown="prevent"><i
            class="el-icon-fa-align-center"></i></span>
          <span :class="{active: justifyRightIsActive}" @click="justifyRight" @mousedown="prevent"><i
            class="el-icon-fa-align-right"></i></span>
          <span :class="{active: justifyFullIsActive}" @click="justifyFull" @mousedown="prevent"><i
            class="el-icon-fa-align-justify"></i></span>
          <!--<span :class="{active: insertOrderedListIsActive}" @click="insertUnorderedList" @mousedown="prevent"><i class="el-icon-fa-list"></i></span>-->
        </div>
      </div>
      <div class="option-container">
      </div>
      <div class="text-container">
        <div contenteditable class="text-area" id="text-area" @mouseup="onSelection" @input="autoSave"
             placeholder="Enter text here..." data-placeholder="Enter text here...">
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
        justifyLeftIsActive: false,
        justifyCenterIsActive: false,
        justifyRightIsActive: false,
        justifyFullIsActive: false,
        insertOrderedListIsActive: false,

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
      showFontOptions(e) {
        // 阻止子元素 点击事件
        if (e.target.className.includes('font-btn-wrapper') || e.target.className.includes('el-icon-fa-font')) {
          this.showFont = !this.showFont
        }
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
      autoSave(e) {
        this.$store.commit('setContent', e.target.innerHTML)
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
          noneStyle()
        } else {
          fillActive(parentNode)
          styles.includes('bold') ? this.boldIsActive = true : this.boldIsActive = false
          styles.includes('italic') ? this.italicIsActive = true : this.italicIsActive = false
          styles.includes('left') ? this.justifyLeftIsActive = true : this.justifyLeftIsActive = false
          styles.includes('center') ? this.justifyCenterIsActive = true : this.justifyCenterIsActive = false
          styles.includes('right') ? this.justifyRightIsActive = true : this.justifyRightIsActive = false
          styles.includes('justify') ? this.justifyFullIsActive = true : this.justifyFullIsActive = false
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

        function noneStyle() {
          for (let key in this) {
            if (this.hasOwnProperty(key)) {
              if (key.includes('IsActive')) {
                this[key] = false
              }
            } else {
              return
            }
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
      insertOrderedList() {
        document.execCommand('insertOrderedList', false)
      },
      insertUnorderedList() {
        document.execCommand('insertUnorderedList', false)
      },
      formatBlock(param) {
        document.execCommand('formatBlock', false, param)
      },
      justifyRadio(selected) {
        let radios = ['justifyCenter', 'justifyFull', 'justifyLeft', 'justifyRight']
        console.log(radios)
        radios = radios.filter(radio => radio !== selected)
        radios.forEach(radio => {
          radio += 'IsActive'
          this[radio] = false
        })
      },
      justifyCenter() {
        let result = document.execCommand('justifyCenter', false)
        if (result) {
          this.justifyCenterIsActive = true
          this.justifyRadio('justifyCenter')
        }
      },
      justifyFull() {
        let result = document.execCommand('justifyFull', false)
        if (result) {
          this.justifyFullIsActive = true
          this.justifyRadio('justifyFull')
        }
      },
      justifyLeft() {
        let result = document.execCommand('justifyLeft', false)
        if (result) {
          this.justifyLeftIsActive = true
          this.justifyRadio('justifyLeft')
        }
      },
      justifyRight() {
        let result = document.execCommand('justifyRight', false)
        if (result) {
          this.justifyRightIsActive = true
          this.justifyRadio('justifyRight')
        }
      },
      outdent() {
        document.execCommand('outdent', false)
      },
      redo() {
        document.execCommand('redo', false)
      },
      undo() {
        document.execCommand('undo', false)
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

  #wysiwyg {
    background: $white;
  }

  .container {
    border: 1px solid $extra-light-black;
    min-width: 300px;
  }

  .icon-container {
    width: 100%;
    height: 70px;
  }

  .icon-group {
    position: fixed;
    > span {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;

      padding: 10px;
      cursor: pointer;
      text-align: center;
    }
  }

  .active {
    background: $gray;
  }

  .option-container {
  }

  .text-container {
  }

  .text-area-container {

  }

  .text-area {
    min-height: 300px;
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

  .font-btn-wrapper {
    position: relative;
  }

  .font-options {
    cursor: default;
    position: absolute;
    display: block;
    top: 40px;
    left: 0;
    width: 300px;
    padding: 10px;
    background: rgba($light-gray, .5);

    > select {
      width: 100px;
    }
  }

  [contenteditable=true]:empty:before {
    content: attr(placeholder);
    color: $gray;
    display: block; /* For Firefox */
  }
</style>
