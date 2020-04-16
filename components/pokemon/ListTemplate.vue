<template>
  <v-row no-gutters class="list-element" @click="$emit('showPokemon')">
    <v-col
      id="info"
      cols="9"
      :class="getColor(color)"
      class="d-flex flex-column justify-center"
    >
      <v-row no-gutters dense justify="space-between" align="center">
        <v-col cols="auto">
          <span class="mx-2" :class="`${getColor(color)}--text text--darken-4`">
            #{{ String(pokemonDetails.id).padStart(3, '0') }}
          </span>
        </v-col>
        <v-col
          cols="5"
          class="ellipsis"
          :class="`${getColor(color)}--text text--darken-4`"
        >
          <span class="text-uppercase">
            {{ pokemonDetails.name }}
          </span>
        </v-col>
        <v-col cols="auto" class="d-flex justify-space-between px-1">
          <icons :id="pokemonDetails.id" :color="getColor(color)" />
        </v-col>
      </v-row>
      <v-row no-gutters dense justify="space-between" align="center">
        <v-col v-for="item in pokemonDetails.types" :key="item.type.name">
          <type :color="getColor(color)" :name="item.type.name" />
        </v-col>
        <v-col cols="auto">
          <v-chip small dark :color="`${getColor(color)} darken-2`">
            Attack: {{ attack(pokemonDetails.stats) }}
          </v-chip>
        </v-col>
      </v-row>
    </v-col>
    <v-col id="img" cols="3" :class="`${getColor(color)}`">
      <poke-image :id="pokemonDetails.id" :color="getColor(color)" />
    </v-col>
  </v-row>
</template>

<script>
import { pokemon } from '~/mixins/pokemon'

export default {
  name: 'ListTemplate',
  mixins: [pokemon]
}
</script>

<style scoped lang="scss">
#info {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
#img {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  ::v-deep .pokemon-img {
    border-radius: 50% 8px 8px 50%;
  }
}
</style>
