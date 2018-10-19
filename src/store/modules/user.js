import { get } from '../../utilities/rest'

let schema = {
  _id: null,
  uid: null,
  avatar: null,
  username: null,
  nickname: null,
  birthday: null
}

let state = Object.assign({}, schema)

let mutations = {
  setUser(state, user) {
    state = Object.assign(state, user)
  }
}

let actions = {
  getUser({ commit }, { username }) {
    let where = {
      username
    }
    where = JSON.stringify(where)
    get(`/user?where=${where}`)
      .then(user => {
        commit('setUser', user)
      })
  },
  async me({ state, commit, rootState }) {
    if (state._id) {
      return state
    } else {
      let user = await get(`/me`)
      commit('setUser', user)
    }
  },
  async signOut({ state, commit }) {
    await get(`/sign-out`)
    commit('setUser', schema)
  }
}

export default {
  state,
  mutations,
  actions
}
