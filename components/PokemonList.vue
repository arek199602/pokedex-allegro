<template>
  <div :class="isRow">
    <fetch-json
      v-for="(pokemon, index) in pokemons.results"
      :key="index"
      :url="pokemon.url"
    >
      <template v-slot:component="{ response: { data: pokemonDetails } }">
        <fetch-json :url="pokemonDetails.species.url">
          <template v-slot:component="{ response: { data: { color } } }">
            <list-template
              v-if="listType === 'view-list'"
              :pokemon-details="pokemonDetails"
              :color="color.name"
              @showPokemon="showPokemon(pokemon)"
            />
            <v-col v-else>
              <grid-template
                :pokemon-details="pokemonDetails"
                :color="color.name"
                :max-width="maxWidth"
                @showPokemon="showPokemon(pokemon)"
              />
            </v-col>
          </template>
        </fetch-json>
      </template>
    </fetch-json>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import GridTemplate from './pokemon/GridTemplate'
import ListTemplate from './pokemon/ListTemplate'
import FetchJson from './FetchJson'
const { mapActions } = createNamespacedHelpers('pokemon')
const { mapState } = createNamespacedHelpers('listType')

export default {
  name: 'PokemonList',
  components: {
    FetchJson,
    GridTemplate,
    ListTemplate
  },
  props: {
    pokemons: { required: true, type: [Object, Array] }
  },
  data() {
    return {
      stars: [],
      circles: []
    }
  },
  computed: {
    ...mapState(['listType']),
    isRow() {
      return {
        row: this.listType === 'grid-outline',
        'justify-center': this.listType === 'grid-outline',
        'no-gutters': this.listType === 'grid-outline'
      }
    },
    maxWidth() {
      return this.$vuetify.breakpoint.xs ? '300' : '250'
    }
  },
  methods: {
    ...mapActions(['setPokemon']),
    showPokemon(pokemon) {
      this.setPokemon(pokemon)
      this.$router.push('/details')
    },
    switchIcon(id, type) {
      const icon = this[type].find((icon) => icon.id === id)
      icon !== undefined
        ? (icon.active = !icon.active)
        : this[type].push({ id, active: true })
    },
    isIconActive(id, type) {
      const icon = this[type].find((icon) => icon.id === id)
      return icon !== undefined ? icon.active : false
    }
  }
}
</script>

<style scoped lang="scss"></style>
