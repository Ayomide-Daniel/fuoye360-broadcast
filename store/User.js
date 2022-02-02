import User from '../user.json'

const state = () => ({
  data: User.data,
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
  //   setbroadcaststatus: (state, data) => {
  //     const broadcastsFx = state.broadcasts.map((question) => {
  //       if (question.title === data.question.title) {
  //         question.status = true
  //         question.selectedOption = data.answer
  //       }
  //       return question
  //     })
  //     state.broadcasts = broadcastsFx
  //   },
  //   updateResult: (state) => {
  //     state.broadcasts.forEach((question) => {
  //       if (question.selectedOption + 1 === question.answer) {
  //         state.result++
  //       }
  //     })
  //     state.hasTakenQuiz = true
  //     return true
  //   },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
