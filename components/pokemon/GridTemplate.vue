<template>
  <v-card :max-width="maxWidth" @click="$emit('showPokemon')">
    <poke-image
      :id="pokemonDetails.id"
      :color="getColor(color)"
      :height="'200'"
    />
    <v-card-title
      class="text-uppercase"
      :class="`${getColor(color)}--text text--darken-4`"
    >
      #{{ String(pokemonDetails.id).padStart(3, '0') }}
      {{ pokemonDetails.name }}
    </v-card-title>

    <v-card-subtitle>
      <v-chip small dark :color="`${getColor(color)} darken-2`">
        Atak: {{ attack(pokemonDetails.stats) }}
      </v-chip>
    </v-card-subtitle>

    <v-card-actions>
      <type
        v-for="item in pokemonDetails.types"
        :key="item.type.name"
        :color="getColor(color)"
        :name="item.type.name"
      />
      <v-spacer />
      <icons :id="pokemonDetails.id" :color="getColor(color)" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { pokemon } from '~/mixins/pokemon'
export default {
  name: 'GridTemplate',
  mixins: [pokemon],
  props: {
    maxWidth: { type: String, default: '' }
  }
}
</script>

<style scoped></style>
