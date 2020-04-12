<template>
  <v-list dense>
    <fetch-json
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :url="pokemon.url"
    >
      <template v-slot:component="{ response: { data } }">
        <fetch-json :url="data.species.url">
          <template v-slot:component="{ response: { data: { color } } }">
            <v-row no-gutters dense :class="color.name">
              <v-col cols="9">
                <v-row no-gutters dense>
                  <v-col cols="2">
                    <span class="mx-2"> #{{ data.id }} </span>
                  </v-col>
                  <v-col cols="4">
                    {{ data.name }}
                  </v-col>
                  <v-col
                    cols="3"
                    class="d-flex justify-space-between px-1"
                    offset="2"
                  >
                    <v-icon
                      v-if="isStarActive(data.id)"
                      class="pl-2"
                      @click="switchStar(data.id, false)"
                    >
                      mdi-star
                    </v-icon>
                    <v-icon
                      v-else
                      class="pl-2"
                      @click="switchStar(data.id, true)"
                    >
                      mdi-star-outline
                    </v-icon>
                    <v-icon
                      v-if="isCircleActive(data.id)"
                      class="pl-2"
                      @click="switchCircle(data.id, false)"
                    >
                      mdi-checkbox-marked-circle
                    </v-icon>
                    <v-icon
                      v-else
                      class="pl-2"
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
                      dark
                      class="d-flex justify-center mx-2"
                    >
                      {{ item.type.name }}
                    </v-chip>
                  </v-col>
                  <v-col cols="3">
                    <v-chip small> Atak: {{ attack(data.stats) }} </v-chip>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-img height="64" :src="data.sprites.front_default" />
              </v-col>
            </v-row>
          </template>
        </fetch-json>
      </template>
    </fetch-json>
  </v-list>
</template>

<script>
import FetchJson from './FetchJson'
export default {
  name: 'PokemonList',
  components: {
    FetchJson
  },
  props: {
    pokemons: { required: true, type: Array }
  },
  data() {
    return {
      stars: [],
      circles: []
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
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  margin: 0.25rem;
  border-radius: 8px;
  color: white;
}
</style>
