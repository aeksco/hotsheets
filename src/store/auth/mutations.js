
// Project Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },

  set_token (state, jsonwebtoken) {
    state.token = jsonwebtoken
  },

  flush_token (state) {
    state.token = null
  },

  set_user (state, user) {
    state.user = user
  },

  googleAuthenticated (state, status) {
    state.googleAuthenticated = status
  }
}

export default mutations
