export default {
  setName({ commit }, name) {
    commit('SET_NAME', name)
  },
  openFilter({ commit }, isOpen) {
    commit('OPEN_FILTER', isOpen)
  }
}
