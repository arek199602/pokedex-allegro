<template>
  <v-row no-gutters>
    <v-col>
      <fetch-json :url="url">
        <template v-slot:component="{ response: { data: pokemons } }">
          <pokemon-list :pokemons="pokemons.results" />
        </template>
      </fetch-json>
      <floating-button />
    </v-col>
  </v-row>
</template>

<script>
import FetchJson from '~/components/FetchJson'
import FloatingButton from '~/components/FloatingButton'
import PokemonList from '~/components/PokemonList'

export default {
  components: {
    FetchJson,
    FloatingButton,
    // eslint-disable-next-line vue/no-unused-components
    PokemonList
  },
  data() {
    return {
      url: '/pokemon'
    }
  }
}
</script>
