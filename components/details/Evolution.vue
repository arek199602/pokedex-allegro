<template>
  <v-card height="100%" :class="`${getColor(color)}--text text--darken-4`">
    <v-card-title>Evolution</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <poke-image :id="id(url)" :height="'64'" />
          <p class="text-center">{{ name }}</p>
        </v-col>
        <v-col v-if="isSecondEvolution" cols="4">
          <poke-image :id="id(secondEvolutionUrl)" :height="'64'" />
          <p class="text-center">
            {{ secondEvolutionName }}
          </p>
        </v-col>
        <v-col v-if="isThirdEvolution" cols="4">
          <poke-image :id="id(thirdEvolutionUrl)" :height="'64'" />
          <p class="text-center">
            {{ thirdEvolutionName }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable camelcase */
import PokeImage from '~/components/pokemon/PokeImage'
export default {
  name: 'Evolution',
  components: {
    PokeImage
  },
  props: {
    url: { required: true, type: String },
    evolutionChain: { required: true, type: Object },
    color: { required: true, type: String },
    getColor: { required: true, type: Function }
  },
  computed: {
    name() {
      return this.evolutionChain.species.name
    },
    isSecondEvolution() {
      return this.evolutionChain.evolves_to.length
    },
    secondEvolutionName() {
      return this.evolutionChain.evolves_to[0].species.name
    },
    secondEvolutionUrl() {
      return this.evolutionChain.evolves_to[0].species.url
    },
    isThirdEvolution() {
      return this.evolutionChain.evolves_to[0]?.evolves_to?.length
    },
    thirdEvolutionName() {
      return this.evolutionChain.evolves_to[0].evolves_to[0].species.name
    },
    thirdEvolutionUrl() {
      return this.evolutionChain.evolves_to[0].evolves_to[0].species.url
    }
  },
  methods: {
    id(url) {
      return parseInt(
        url
          .match(/\/\d+\//)
          ?.toString()
          ?.replace(/\//g, '')
      )
    }
  }
}
</script>

<style scoped></style>
