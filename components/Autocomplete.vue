<template>
  <v-autocomplete
    v-model="model"
    append-icon=""
    :items="items"
    :loading="isLoading"
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
    color="rgba(255, 255, 255, 0.5)"
    background-color="transparent"
    @change="selectPokemon"
  ></v-autocomplete>
</template>

<script>
export default {
  name: 'Autocomplete',
  props: {
    map: { type: Object, default: () => {} }
  },
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
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
    },
    model() {
      console.log('model changed')
    }
  },
  created() {},
  methods: {
    async searchPokemon() {
      const res = await this.$axios.get('/pokemon/?limit=964')
      const { count, results } = res.data
      this.count = count
      this.entries = results
    },
    selectPokemon(pokemon) {
      console.log('Selected pokemon: ', pokemon)
    }
  }
}
</script>

<style scoped></style>
