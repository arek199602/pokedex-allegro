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
                      <v-icon
                        v-if="isStarActive(data.id)"
                        :color="`${color.name} darken-3`"
                        @click="switchStar(data.id, false)"
                      >
                        mdi-star
                      </v-icon>
                      <v-icon
                        v-else
                        :color="`${color.name} darken-3`"
                        @click="switchStar(data.id, true)"
                      >
                        mdi-star-outline
                      </v-icon>
                      <v-icon
                        v-if="isCircleActive(data.id)"
                        :color="`${color.name} darken-3`"
                        @click="switchCircle(data.id, false)"
                      >
                        mdi-checkbox-marked-circle
                      </v-icon>
                      <v-icon
                        v-else
                        :color="`${color.name} darken-3`"
                        @click="switchCircle(data.id, true)"
                      >
                        mdi-checkbox-blank-circle-outline
                      </v-icon>
                    </v-col>
                  </v-row>
                  <v-row no-gutters dense>
                    <v-col
                      v-for="(item, index) in data.types"
                      :key="index"
                      :cols="cols(data.types.length)"
                    >
                      <v-chip
                        small
                        outlined
                        :color="`${color.name} darken-4`"
                        class="d-flex justify-center mx-2 text-uppercase"
                      >
                        {{ item.type.name }}
                      </v-chip>
                    </v-col>
                    <v-col cols="3">
                      <v-chip small dark :color="`${color.name} darken-2`">
                        Atak: {{ attack(data.stats) }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col id="img" cols="3" :class="`${color.name}`">
                  <v-img
                    height="64"
                    contain
                    position="center center"
                    :class="`${color.name} lighten-3`"
                    class="pokemon-img"
                    :src="
                      `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`
                    "
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
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
export default {
  name: 'PokemonList',
  components: {
    FetchJson
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
    switchStar(id, active) {
      const star = this.stars.find((star) => star.id === id)
      star !== undefined
        ? (star.active = active)
        : this.stars.push({ id, active })
    },
    isStarActive(id) {
      const star = this.stars.find((star) => star.id === id)
      return star !== undefined ? star.active : false
    },
    switchCircle(id, active) {
      const circle = this.circles.find((circle) => circle.id === id)
      circle !== undefined
        ? (circle.active = active)
        : this.circles.push({ id, active })
    },
    isCircleActive(id) {
      const circle = this.circles.find((circle) => circle.id === id)
      return circle !== undefined ? circle.active : false
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
  }
}
.pokemon-img {
  border-radius: 50% 8px 8px 50%;
}
</style>
