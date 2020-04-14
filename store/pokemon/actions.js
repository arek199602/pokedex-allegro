export default {
  setPokemon({ commit }, pokemon) {
    commit('SET_POKEMON', pokemon)
  },
  setPokemons({ commit }, pokemons) {
    commit('SET_POKEMONS', pokemons)
  }
}
