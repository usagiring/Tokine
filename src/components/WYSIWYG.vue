<template>
  <div id="wysiwyg">
    <div class="container">
      <div class="action-container">
        <div class="icon-group">
          <div class="icon-container">
             <span class="font-btn-wrapper" :class="{active: boldIsActive}" @click="bold" @mousedown="prevent"><i
               class="fa fa-bold"></i></span>
          </div>
          <div class="icon-container">
             <span class="font-btn-wrapper" :class="{active: italicIsActive}" @click="italic" @mousedown="prevent"><i
               class="fa fa-italic"
               @click="italic"
               @mousedown="prevent"></i></span>
          </div>
          <div class="icon-container">
            <span class="font-btn-wrapper" :class="{active: underlineIsActive}" @click="underline" @mousedown="prevent"><i
              class="fa fa-underline"></i></span>
          </div>
          <div class="icon-container">
            <span class="font-btn-wrapper" :class="{active: strikeThroughIsActive}" @click="strikeThrough"
                  @mousedown="prevent"><i
              class="fa fa-strikethrough"></i></span>
          </div>
          <div class="icon-container" @mouseover="showFontOptions(true)" @mouseout="showFontOptions(false)">
            <span class="font-btn-wrapper">
              <i class="fa fa-font"></i>
            </span>
            <div v-show="showFont" class="font-options">
              <div @mousedown="prevent" @click="fontName('黑体')">黑体</div>
              <div @mousedown="prevent" @click="fontName('微软雅黑')">微软雅黑</div>
              <div @mousedown="prevent" @click="fontName('Arial')">Arial</div>
            </div>
          </div>
          <div class="icon-container" @mouseover="showHeaderOptions(true)" @mouseout="showHeaderOptions(false)">
            <span class="font-btn-wrapper">
              <i class="fa fa-header"></i>
            </span>
            <div v-show="showHeader" class="font-options">
              <div @mousedown="prevent" @click="fontSize('7')">h1</div>
              <div @mousedown="prevent" @click="fontSize('6')">h2</div>
              <div @mousedown="prevent" @click="fontSize('5')">h3</div>
              <div @mousedown="prevent" @click="fontSize('4')">h4</div>
              <div @mousedown="prevent" @click="fontSize('3')">h5</div>
              <div @mousedown="prevent" @click="fontSize('2')">h6</div>
            </div>
          </div>
          <div class="icon-container" @mouseover="showColorOptions(true)" @mouseout="showColorOptions(false)">
            <span class="font-btn-wrapper">
              <i class="fa fa-diamond"></i>
            </span>
            <div v-show="showColor" class="font-options" @mousedown="prevent">
              <div class="color-block" style="background: white" @click="foreColor('white')"></div>
              <div class="color-block" style="background: black" @click="foreColor('black')"></div>
              <div class="color-block" style="background: gray" @click="foreColor('gray')"></div>
              <div class="color-block" style="background: gold" @click="foreColor('gold')"></div>
              <div class="color-block" style="background: salmon" @click="foreColor('salmon')"></div>
              <div class="color-block" style="background: green" @click="foreColor('green')"></div>
              <div class="color-block" style="background: saddlebrown" @click="foreColor('saddlebrown')"></div>
              <div class="color-block" style="background: sandybrown" @click="foreColor('sandybrown')"></div>
              <div class="color-block" style="background: blueviolet" @click="foreColor('blueviolet')"></div>
              <div class="color-block" style="background: bisque" @click="foreColor('bisque')"></div>
              <div class="color-block" style="background: brown" @click="foreColor('brown')"></div>
              <div class="color-block" style="background: royalblue" @click="foreColor('royalblue')"></div>
            </div>
          </div>
          <div class="icon-container">
           <span class="font-btn-wrapper" :class="{active: justifyLeftIsActive}" @click="justifyLeft"
                 @mousedown="prevent"><i
             class="fa fa-align-left"></i></span>
          </div>
          <div class="icon-container">
           <span class="font-btn-wrapper" :class="{active: justifyCenterIsActive}" @click="justifyCenter"
                 @mousedown="prevent"><i
             class="fa fa-align-center"></i></span>
          </div>
          <div class="icon-container">
            <span class="font-btn-wrapper" :class="{active: justifyRightIsActive}" @click="justifyRight"
                  @mousedown="prevent"><i
              class="fa fa-align-right"></i></span>
          </div>
          <div class="icon-container">
           <span class="font-btn-wrapper" :class="{active: justifyFullIsActive}" @click="justifyFull"
                 @mousedown="prevent"><i
             class="fa fa-align-justify"></i></span>
          </div>
          <div class="icon-container">
           <span class="font-btn-wrapper" @click="indent"
                 @mousedown="prevent"><i
             class="fa fa-indent"></i></span>
          </div>
          <div class="icon-container">
           <span class="font-btn-wrapper" @click="outdent"
                 @mousedown="prevent"><i
             class="fa fa-outdent"></i></span>
          </div>
          <div class="icon-container">
           <span class="font-btn-wrapper" @click="removeFormat"
                 @mousedown="prevent"><i
             class="fa fa-remove"></i></span>
          </div>
        </div>
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
  export default {
    name: 'wysiwyg',
    props: ['html'],
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

        showFont: false,
        showHeader: false,
        showColor: false
      }
    },
    computed: {},
    created() {
      document.execCommand('styleWithCSS', false, null)
    },
    mounted() {
      $('#text-area').html(this.html)

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
      showFontOptions(bool) {
        this.showFont = bool
      },
      showHeaderOptions(bool) {
        this.showHeader = bool
      },
      showColorOptions(bool) {
        this.showColor = bool
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
      onSelection() {
        let styles = ''
        let parentNode = window.getSelection().getRangeAt(0).startContainer.parentNode
        if (parentNode.id === 'text-area') {
          noneStyle(this)
        } else {
          fillActive(parentNode)
          console.log(styles)
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

        function noneStyle(self) {
          for (let key in self) {
            if (self.hasOwnProperty(key)) {
              if (key.includes('IsActive')) {
                self[key] = false
              }
            } else {
              return
            }
          }
        }
      },

      bold() {
        let result = document.execCommand('bold', false, null)
        if (result) {
          this.boldIsActive = !this.boldIsActive
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
        let result = document.execCommand('foreColor', false, color)
        console.log(result)
      },
      fontName(font) {
        console.log(font)
        let result = document.execCommand('fontName', false, font)
        console.log(result)
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
        let result = document.execCommand('outdent', false)
      },
      indent() {
        let result = document.execCommand('indent', false)
      },
      redo() {
        document.execCommand('redo', false)
      },
      undo() {
        document.execCommand('undo', false)
      },
      insertImage(url) {
        document.execCommand('insertImage', false, url)
      },
      unlink() {
        document.execCommand('unlink', false)
      },
      createLink(url) {
        document.execCommand('createLink', false, url)
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
    border: 1px solid $gray;
    min-width: 300px;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    padding: 3px 10px;

    &:hover {
      border-color: $silver;
    }

    &:focus {
      border-color: $silver;
    }
  }

  .icon-container {
    vertical-align: top;
    display: inline-block;
    width: 40px;
    height: 40px;

    &:hover {
      background: $extra-light-gray;
    }
  }

  .action-container {
    width: 100%;
    height: 70px;
  }

  .icon-group {
    position: fixed;
  }

  .active {
    background: $gray;
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
    display: block;
    height: 100%;
    width: 100%;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .font-options {
    width: 100px;
    padding: 10px;
    text-align: center;
    background: $extra-light-gray;

    cursor: pointer;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
      Introduced in IE 10.
      See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
    */
    -ms-user-select: none;
    user-select: none;
  }

  .color-block {
    display: inline-block;
    width: 30px;
    height: 30px;
  }

  [contenteditable=true]:empty:before {
    content: attr(placeholder);
    color: $gray;
    display: block; /* For Firefox */
  }
</style>
