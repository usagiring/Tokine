<template>
  <div id="markdown-editor" class="markdown-editor">
    <div class="edit-area-container">
      <textarea class="edit-area" @input="generate" title="edit-area"></textarea>
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
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../style/common/variables';

  .edit-area-container {
    height: 400px;
  }

  .edit-area {
    width: 100%;
    height: 100%;
  }

  .view-area {
    height: 400px;
  }
</style>
