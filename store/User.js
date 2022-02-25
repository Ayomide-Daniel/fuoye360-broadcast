const state = () => ({
  auth: false,
  data: {},
})

const getters = {
  data: (state) => state.User,
}

const actions = {
  //   updateStatus({ commit }, data) {
  //     commit('setbroadcaststatus', data)
  //   },
  //   markAnswers({ commit }) {
  //     commit('updateResult')
  //   },
}
const mutations = {
  setUserData: (state, data) => {
    state.data = data
    state.auth = true
  },
  updateUserFollowing: (state, data) => {
    state.data.following = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
