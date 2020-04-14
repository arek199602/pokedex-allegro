<template>
  <v-combobox
    ref="autocomplete"
    v-model="model"
    append-icon=""
    :items="items"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    item-text="Description"
    item-value="API"
    label="Public APIs"
    placeholder="Start typing to Search"
    return-object
    class="without-underline"
    prepend-inner-icon="mdi-magnify"
    hide-details
    solo
    flat
    autofocus
    color="#033"
    background-color="transparent"
    @change="selectPokemon"
  ></v-combobox>
</template>

<script>
import { debounce } from 'debounce'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('pokemon')
export default {
  name: 'Autocomplete',
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      model: null,
      search: null
    }
  },
  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.name.length > this.descriptionLimit
            ? entry.name.slice(0, this.descriptionLimit) + '...'
            : entry.name
        return Object.assign({}, entry, { Description })
      })
    }
  },

  watch: {
    search(val) {
      this.isLoading = true
      // Lazily load input items
      this.searchPokemon()

      this.setPokemons(this.pokemonObject())
    },
    model() {
      console.log('model changed')
    }
  },
  created() {
    this.setPokemons = debounce(this.setPokemons, 500)
  },
  methods: {
    ...mapActions(['setPokemon', 'setPokemons']),
    async searchPokemon() {
      const res = await this.$axios.get('/pokemon/?limit=964')
      const { count, results } = res.data
      this.count = count
      this.entries = results
    },
    selectPokemon(pokemon) {
      if (typeof pokemon === 'object') {
        this.setPokemon({ ...pokemon })
        this.$router.push('/details')
      }
    },
    pokemonObject() {
      if (this.search) {
        return {
          results: this.$refs.autocomplete.filteredItems,
          count: this.$refs.autocomplete.filteredItems.length
        }
      } else {
        return {
          reults: [],
          count: 0
        }
      }
    }
  }
}
</script>

<style scoped></style>
