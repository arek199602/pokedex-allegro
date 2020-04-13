<template>
  <v-row no-gutters>
    <v-col>
      <fetch-json :url="url">
        <template v-slot:component="{ response: { data: pokemons } }">
          <pokemon-list
            :limit="limit"
            :pokemons="pokemons"
            @pageChanged="changeUrl"
          />
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
    PokemonList
  },
  data() {
    return {
      url: '/pokemon',
      limit: 20
    }
  },
  methods: {
    changeUrl(page) {
      if (page === 1) {
        this.url = '/pokemon'
      } else {
        this.url = `/pokemon/?limit=${this.limit}&offset=${this.limit * page}`
      }
    }
  }
}
</script>
