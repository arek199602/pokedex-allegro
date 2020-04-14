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
                <v-col id="info" cols="9" :class="color.name">
                  <v-row no-gutters dense>
                    <v-col cols="2">
                      <span
                        class="mx-2"
                        :class="`${color.name}--text text--darken-4`"
                      >
                        #{{ data.id }}
                      </span>
                    </v-col>
                    <v-col cols="4">
                      <span
                        class="text-uppercase"
                        :class="`${color.name}--text text--darken-4`"
                      >
                        {{ data.name }}
                      </span>
                    </v-col>
                    <v-col
                      cols="3"
                      class="d-flex justify-space-between px-1"
                      offset="2"
                    >
                      <icons :id="data.id" :color="color.name" />
                    </v-col>
                  </v-row>
                  <v-row no-gutters dense>
                    <v-col
                      v-for="item in data.types"
                      :key="item.type.name"
                      :cols="cols(data.types.length)"
                    >
                      <type :color="color.name" :name="item.type.name" />
                    </v-col>
                    <v-col cols="3">
                      <v-chip small dark :color="`${color.name} darken-2`">
                        Atak: {{ attack(data.stats) }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col id="img" cols="3" :class="`${color.name}`">
                  <poke-image :id="data.id" :color="color.name" />
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
    pokemons: { required: true, type: Object },
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
      return Math.floor(this.pokemons.count / this.limit)
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
    cols(numberOfItems) {
      return (numberOfItems === 1 && 8) || (numberOfItems === 2 && 4)
    },
    onIntersect(entries) {
      this.$emit('paginationWasIntersected', entries[0].isIntersecting)
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
