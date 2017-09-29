import {get} from '../../utilities/rest'

let state = {
  _id: null,
  uid: null,
  username: null,
  nickname: null,
  birthday: null
}

let mutations = {
  setUser(state, user) {
    // console.log(state)
    //
    // state = {...state, ...user}
    // console.log(state)

    state.username = user.username
  }
}

let actions = {
  getUser({commit}, {username}) {
    // this.$store.dispatch('xxx',{username})
    // store.dispatch('getUser',{username})
    let where = {
      username
    }
    where = JSON.stringify(where)
    get(`/user?where=${where}`)
      .then(user => {
        commit('setUser', user)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
