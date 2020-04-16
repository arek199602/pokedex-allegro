<template>
  <v-col>
    <v-card max-width="300" @click="$emit('showPokemon')">
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
  </v-col>
</template>

<script>
import Icons from '../pokemon/Icons'
import PokeImage from './PokeImage'
import Type from './Type'
import { colors } from '~/mixins/colors'
export default {
  name: 'GridTemplate',
  components: {
    PokeImage,
    Icons,
    Type
  },
  mixins: [colors],
  props: {
    pokemonDetails: { required: true, type: Object },
    color: { required: true, type: String },
    attack: { required: true, type: Function }
  }
}
</script>

<style scoped></style>
