let schema = {
  content: '',
  blogs: [],
  loaded: false
}

let state = Object.assign({}, schema)

let mutations = {
  setContent(state, html) {
    state.content = html
  },
  setBlogs(state, blogs) {
    state.loaded = true
    state.blogs = blogs
  },
  removeBlog(state, blog) {
    state.blogs = state.blogs.filter(item => item._id !== blog._id)
  }
}

let actions = {}

export default {
  state,
  mutations,
  actions
}
