import {get} from '../../utilities/rest'

let schema = {
  content: ''
}

let state = Object.assign({}, schema)

let mutations = {
  setContent(state, html) {
    state.content = html
  }
}

let actions = {
}

export default {
  state,
  mutations,
  actions
}
