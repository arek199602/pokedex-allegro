<template>
  <v-row no-gutters>
    <v-col>
      <fetch-json
        v-for="(pokemon, index) in pokemons.results"
        :key="index"
        :url="pokemon.url"
      >
        <template v-slot:component="{ response: { data } }">
          <fetch-json :url="data.species.url">
            <template v-slot:component="{ response: { data: { color } } }">
              <v-row no-gutters>
                <v-col id="info" cols="9" :class="getColor(color.name)">
                  <v-row no-gutters dense justify="space-between">
                    <v-col cols="auto">
                      <span
                        class="mx-2"
                        :class="`${getColor(color.name)}--text text--darken-4`"
                      >
                        #{{ String(data.id).padStart(3, '0') }}
                      </span>
                    </v-col>
                    <v-col cols="5">
                      <span
                        class="text-uppercase"
                        :class="`${getColor(color.name)}--text text--darken-4`"
                      >
                        {{ data.name }}
                      </span>
                    </v-col>
                    <v-col
                      cols="auto"
                      class="d-flex justify-space-between px-1"
                    >
                      <icons :id="data.id" :color="getColor(color.name)" />
                    </v-col>
                  </v-row>
                  <v-row no-gutters dense justify="space-between">
                    <v-col v-for="item in data.types" :key="item.type.name">
                      <type
                        :color="getColor(color.name)"
                        :name="item.type.name"
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-chip
                        small
                        dark
                        :color="`${getColor(color.name)} darken-2`"
                      >
                        Atak: {{ attack(data.stats) }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col id="img" cols="3" :class="`${getColor(color.name)}`">
                  <poke-image :id="data.id" :color="getColor(color.name)" />
                </v-col>
              </v-row>
            </template>
          </fetch-json>
        </template>
      </fetch-json>
    </v-col>
    <v-col>
      <div class="text-center">
        <v-pagination
          v-model="page"
          v-intersect="onIntersect"
          :length="numberOfPages"
          @input="$emit('pageChanged', $event)"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import FetchJson from './FetchJson'
import Icons from './pokemon/Icons'
import PokeImage from './pokemon/PokeImage'
import Type from './pokemon/Type'
export default {
  name: 'PokemonList',
  components: {
    FetchJson,
    PokeImage,
    Icons,
    Type
  },
  props: {
    pokemons: { required: true, type: [Object, Array] },
    limit: { required: true, type: Number }
  },
  data() {
    return {
      stars: [],
      circles: [],
      page: 1
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.pokemons.count / this.limit)
    }
  },
  methods: {
    switchIcon(id, type) {
      const icon = this[type].find((icon) => icon.id === id)
      icon !== undefined
        ? (icon.active = !icon.active)
        : this[type].push({ id, active: true })
    },
    isIconActive(id, type) {
      const icon = this[type].find((icon) => icon.id === id)
      return icon !== undefined ? icon.active : false
    },
    attack(stats) {
      return stats.find((el) => el.stat.name === 'attack').base_stat
    },
    onIntersect(entries) {
      this.$emit('paginationWasIntersected', entries[0].isIntersecting)
    },
    getColor(name) {
      switch (name) {
        case 'white':
          return 'blue-grey'
        case 'gray':
        case 'black':
          return 'grey'
        default:
          return name
      }
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  margin: 0.25rem;
  color: white;
  #info {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  #img {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    ::v-deep .pokemon-img {
      border-radius: 50% 8px 8px 50%;
    }
  }
}
</style>
