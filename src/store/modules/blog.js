import {get} from '../../utilities/rest'

let schema = {
  content: '',
  blogs: null
}

let state = Object.assign({}, schema)

let mutations = {
  setContent(state, html) {
    state.content = html
  },
  setBlogs(state, blogs) {
    state.blogs = blogs
  },
  removeBlog(state, blog) {
    state.blogs = state.blogs.filter(item => item._id !== blog._id)
    console.log(state)
  }
}

let actions = {}

export default {
  state,
  mutations,
  actions
}
