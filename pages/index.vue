<template>
  <v-row no-gutters>
    <v-col>
      <fetch-json :url="url">
        <template
          v-slot:component="{ response: { data: notFilteredPokemons } }"
        >
          <pokemon-list
            :limit="limit"
            :pokemons="pokemons(notFilteredPokemons, slicesParams)"
            @pageChanged="changePage"
            @paginationWasIntersected="toggleFloatingButton = $event"
          />
        </template>
      </fetch-json>
      <floating-button :hide="toggleFloatingButton" />
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import FetchJson from '~/components/FetchJson'
import FloatingButton from '~/components/FloatingButton'
import PokemonList from '~/components/PokemonList'
const { mapState } = createNamespacedHelpers('pokemon')

export default {
  components: {
    FetchJson,
    FloatingButton,
    PokemonList
  },
  data() {
    return {
      url: '/pokemon',
      limit: 20,
      toggleFloatingButton: false,
      slicesParams: []
    }
  },
  computed: {
    ...mapState({
      filteredPokemons: 'pokemons'
    })
  },
  created() {
    this.slicesParams = [0, this.limit]
  },
  methods: {
    changeUrl(page) {
      if (page === 1) {
        this.url = '/pokemon'
      } else {
        this.url = `/pokemon/?limit=${this.limit}&offset=${this.limit * page}`
      }
    },
    changePage(page) {
      if (this.filteredPokemons.results?.length) {
        this.slicesParams = [this.limit * (page - 1), this.limit * page]
      } else {
        this.changeUrl(page)
      }
    },
    pokemons(notFilteredPokemons, slicesParams = [0, this.limit]) {
      if (this.filteredPokemons.results?.length) {
        console.log('here i am')
        return {
          results: this.filteredPokemons.results.slice(
            slicesParams[0],
            slicesParams[1]
          ),
          count: this.filteredPokemons.count
        }
      } else {
        return notFilteredPokemons
      }
    }
  }
}
</script>
