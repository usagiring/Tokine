<template>
  <div id="markdown-editor" class="markdown-editor">
    <div class="edit-area-container">
      <textarea class="edit-area" @input="generate" title="edit-area" autofocus placeholder="please write markdown here..." rows="10"></textarea>
    </div>
    <div class="view-area" v-html="this.html"></div>
  </div>

</template>

<script>
  import showdown from 'showdown'

  export default {
    name: 'markdown-editor',
    data: () => ({
      html: ''
    }),
    computed: {},
    methods: {
      generate(e) {
        let converter = new showdown.Converter()
        let text = e.target.value
        this.html = converter.makeHtml(text);
        this.$store.commit('setContent', this.html)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../style/common/variables';

  .edit-area-container {
    vertical-align: top;
    width: 45%;
    display: inline-block;
  }

  .edit-area {
    width: 100%;
    min-height: 300px;
    height: auto;

    resize: vertical;
  }

  .view-area {
    vertical-align: top;
    width: 45%;
    display: inline-block;
  }
</style>
