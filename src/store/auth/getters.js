
// Project Module Getters
const getters = {
  fetching: state => {
    return state.fetching
  },
  token: state => {
    return state.token || false
  },
  isAuthenticated: state => {
    return state.token
  }
}

export default getters
