<template>
  <div id="markdown-editor" class="markdown-editor">
    <div class="edit-area-container">
      <textarea
        class="edit-area"
        @input="generate"
        title="edit-area"
        autofocus
        placeholder="please write markdown here..."
        rows="10"
      ></textarea>
    </div>
    <div class="view-area-container">
      <div class="view-area" v-html="this.html"></div>
    </div>
  </div>
</template>

<script>
import showdown from "showdown";
import prettify from "showdown-prettify";
const converter = new showdown.Converter({
  extensions: ["prettify"],
  encodeEmails: true,
  emoji: true,
  underline: true,
  tables: true
});
converter.setFlavor("github");

export default {
  name: "markdown-editor",
  data: () => ({
    html: ""
  }),
  computed: {},
  methods: {
    getHtml() {
      return this.html;
    },
    generate(e) {
      let text = e.target.value;
      this.html = converter.makeHtml(text);
      console.log(this.html);
    }
  }
};
</script>

<style scoped lang="scss">
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

  border: 1px solid $gray;
  min-width: 300px;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 10px;

  &:hover {
    border-color: $silver;
  }

  &:focus {
    border-color: $silver;
    outline: none;
  }
}

.view-area-container {
  vertical-align: top;
  width: 45%;
  display: inline-block;
  margin-left: 20px;
}

.view-area {
  padding: 10px;
}
</style>
