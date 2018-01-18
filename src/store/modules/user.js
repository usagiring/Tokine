import {get} from '../../utilities/rest'

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
  getUser({commit}, {username}) {
    let where = {
      username
    }
    where = JSON.stringify(where)
    get(`/user?where=${where}`)
      .then(user => {
        commit('setUser', user)
      })
  },
  signed({state, commit, rootState}) {
    return new Promise((resolve, reject) => {
      if (state._id) {
        resolve(state)
      } else {
        return get(`/signed`)
          .then(user => {
            commit('setUser', user)
            resolve(user)
          })
      }
    })
  },
  signOut({state, commit}) {
    return get(`/sign-out`)
      .then(() => {
        commit('setUser', schema)
        console.log(state)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
