<template>
  <v-card height="100%" :class="`${getColor(color)}--text text--darken-4`">
    <v-card-title>Specie</v-card-title>
    <v-card-text :class="`${getColor(color)}--text text--darken-4`">
      {{ description(flavorTextEntries) }}
    </v-card-text>
    <v-card-actions>
      <v-chip
        outlined
        class="mr-2"
        :class="`${getColor(color)}--text text--darken-4`"
      >
        Height: {{ pokemonDetails.height }}
      </v-chip>
      <v-chip
        outlined
        class="mr-2"
        :class="`${getColor(color)}--text text--darken-4`"
      >
        Weight: {{ pokemonDetails.weight }}
      </v-chip>
      <v-chip
        outlined
        class="mr-2"
        :class="`${getColor(color)}--text text--darken-4`"
      >
        Base experience:
        {{ pokemonDetails.base_experience }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Specie',
  props: {
    flavorTextEntries: { required: true, type: Array },
    pokemonDetails: { required: true, type: Object },
    color: { required: true, type: String },
    getColor: { required: true, type: Function }
  },
  methods: {
    description(entries) {
      return entries.find((entry) => entry.language.name === 'en').flavor_text
    }
  }
}
</script>

<style scoped></style>
