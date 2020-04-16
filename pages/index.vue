<template>
  <v-container>
    <fetch-json :url="url">
      <template v-slot:component="{ response: { data: notFilteredPokemons } }">
        <pokemon-list
          :limit="limit"
          :pokemons="pokemons(notFilteredPokemons, slicesParams)"
        />
        <portal to="pagination">
          <div class="text-center">
            <v-pagination
              v-model="page"
              v-intersect="onIntersect"
              :length="
                numberOfPages(pokemons(notFilteredPokemons, slicesParams).count)
              "
              :total-visible="7"
              @input="changePage"
            ></v-pagination>
          </div>
        </portal>
      </template>
    </fetch-json>
    <portal-target name="pagination" />
    <floating-button :hide="toggleFloatingButton" />
  </v-container>
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
      url: '/pokemon/?limit=21',
      limit: 24,
      toggleFloatingButton: false,
      slicesParams: [],
      page: 1
    }
  },
  computed: {
    ...mapState({
      filteredPokemons: 'pokemons'
    }),
    sm() {
      return this.$vuetify.breakpoint.sm
    },
    md() {
      return this.$vuetify.breakpoint.md
    },
    lg() {
      return this.$vuetify.breakpoint.lg
    },
    xl() {
      return this.$vuetify.breakpoint.xl
    }
  },
  watch: {
    sm: {
      immediate: true,
      handler(newVal) {
        newVal && (this.limit = 20)
      }
    },
    md: {
      immediate: true,
      handler(newVal) {
        newVal && (this.limit = 25)
      }
    },
    lg: {
      immediate: true,
      handler(newVal) {
        newVal && (this.limit = 30)
      }
    },
    xl: {
      immediate: true,
      handler(newVal) {
        newVal && (this.limit = 35)
      }
    }
  },
  created() {
    this.slicesParams = [0, this.limit]
    this.url = `/pokemon/?limit=${this.limit}`
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
    },
    onIntersect(entries) {
      this.toggleFloatingButton = entries[0].isIntersecting
    },
    numberOfPages(pokemonCount) {
      return Math.floor(pokemonCount / this.limit)
    }
  }
}
</script>
