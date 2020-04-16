<template>
  <v-container>
    <fetch-json :url="url">
      <template v-slot:component="{ response: { data: pokemon } }">
        <fetch-json :url="pokemon.species.url">
          <template v-slot:component="{ response: { data: species } }">
            {{ description(species.flavor_text_entries) }}
          </template>
        </fetch-json>
      </template>
    </fetch-json>
  </v-container>
</template>

<script>
import FetchJson from '~/components/FetchJson'
export default {
  name: 'Details',
  components: {
    FetchJson
  },
  computed: {
    url() {
      return localStorage.getItem('pokemon_url')
    }
  },
  methods: {
    description(entries) {
      return entries.find((entry) => entry.language.name === 'en').flavor_text
    }
  }
}
</script>

<style scoped></style>
