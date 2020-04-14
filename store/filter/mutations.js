export default {
  SET_NAME(state, name) {
    state.nameFilter.data = name
  },
  OPEN_FILTER(state, isOpen) {
    state.open = isOpen
  }
}
