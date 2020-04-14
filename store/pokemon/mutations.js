export default {
  SET_POKEMON(state, pokemon) {
    state.pokemon = pokemon
    localStorage.setItem('pokemon_url', pokemon.url)
  }
}
