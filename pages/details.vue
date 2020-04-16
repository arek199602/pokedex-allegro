<template>
  <v-container>
    <fetch-json :url="url">
      <template v-slot:component="{ response: { data: pokemonDetails } }">
        <fetch-json :url="pokemonDetails.species.url">
          <template v-slot:component="{ response: { data: species } }">
            <v-row class="px-4">
              <v-col cols="12">
                <v-row>
                  <v-col
                    cols="12"
                    md="5"
                    class="d-flex flex-column justify-space-between"
                  >
                    <grid-template
                      :pokemon-details="pokemonDetails"
                      :color="species.color.name"
                      :attack="attack"
                    />
                    <v-card class="mt-4">
                      <v-card-title>Abilities</v-card-title>
                      <v-card-text class="d-flex flex-column">
                        <v-chip
                          v-for="item in pokemonDetails.abilities"
                          :key="item.name"
                          class="justify-center mb-1"
                          :color="`${getColor(species.color.name)} lighten-3`"
                          :class="
                            `${getColor(
                              species.color.name
                            )}--text text--darken-4`
                          "
                        >
                          {{ item.ability.name }}
                        </v-chip>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-card :loading="loading" height="100%">
                      <v-card-title>Base Stats</v-card-title>
                      <v-data-table
                        :headers="headers"
                        :items="stats(pokemonDetails.stats)"
                        :items-per-page="5"
                        class="elevation-1 mx-4"
                      ></v-data-table>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card
                      :class="
                        `${getColor(species.color.name)}--text text--darken-4`
                      "
                    >
                      <v-card-title>Moves</v-card-title>
                      <v-card-text>
                        <v-chip
                          v-for="item in pokemonDetails.moves"
                          :key="item.name"
                          small
                          class="justify-center mb-1"
                          :color="`${getColor(species.color.name)} lighten-3`"
                          :class="
                            `${getColor(
                              species.color.name
                            )}--text text--darken-4`
                          "
                        >
                          {{ item.move.name }}
                        </v-chip>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card :height="height">
                      <v-card-title>Specie</v-card-title>
                      <v-card-text>
                        {{ description(species.flavor_text_entries) }}
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
                          Base experience: {{ pokemonDetails.base_experience }}
                        </v-chip>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <portal-target name="evolution" slim />
                  <fetch-json :url="species.evolution_chain.url">
                    <template
                      v-slot:component="{ response: { data: evolution } }"
                    >
                      <portal to="evolution">
                        <v-col cols="12" md="6">
                          <v-card :height="height">
                            <v-card-title>Evolution</v-card-title>
                            <v-card-text>
                              <v-row>
                                <v-col
                                  cols="4"
                                  class="d-flex flex-column align-center"
                                >
                                  <poke-image
                                    :id="id(evolution.chain.species.url)"
                                    :color="getColor(color)"
                                    :height="'64'"
                                  />
                                  <p>{{ evolution.chain.species.name }}</p>
                                </v-col>
                                <v-col
                                  v-if="evolution.chain.evolves_to.length"
                                  cols="4"
                                  class="d-flex flex-column align-center"
                                >
                                  <poke-image
                                    :id="
                                      id(
                                        evolution.chain.evolves_to[0].species
                                          .url
                                      )
                                    "
                                    :color="getColor(color)"
                                    :height="'64'"
                                  />
                                  <p>
                                    {{
                                      evolution.chain.evolves_to[0].species.name
                                    }}
                                  </p>
                                </v-col>
                                <v-col
                                  v-if="
                                    evolution.chain.evolves_to[0] &&
                                      evolution.chain.evolves_to[0].evolves_to
                                        .length
                                  "
                                  cols="4"
                                  class="d-flex flex-column align-center"
                                >
                                  <poke-image
                                    :id="
                                      id(
                                        evolution.chain.evolves_to[0]
                                          .evolves_to[0].species.url
                                      )
                                    "
                                    :color="getColor(color)"
                                    :height="'64'"
                                  />
                                  <p>
                                    {{
                                      evolution.chain.evolves_to[0].species.name
                                    }}
                                  </p>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </portal>
                    </template>
                  </fetch-json>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </fetch-json>
      </template>
    </fetch-json>
  </v-container>
</template>

<script>
import GridTemplate from '../components/pokemon/GridTemplate'
import FetchJson from '~/components/FetchJson'
import { pokemon } from '~/mixins/pokemon'

export default {
  name: 'Details',
  components: {
    GridTemplate,
    FetchJson
  },
  mixins: [pokemon],
  data: () => ({
    loading: false,
    selection: 1,
    headers: [
      {
        text: 'Statistic',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Base stat', value: 'baseStat' },
      { text: 'Effort', value: 'effort' }
    ]
  }),
  computed: {
    url() {
      return localStorage.getItem('pokemon_url')
    },
    height() {
      return this.$vuetify.breakpoint.mdAndUp ? '100%' : 'auto'
    },
    alignSelf() {
      return this.$vuetify.breakpoint.smAndDown ? 'center' : 'auto'
    }
  },
  methods: {
    description(entries) {
      return entries.find((entry) => entry.language.name === 'en').flavor_text
    },
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    stats(stats) {
      return stats.map((item) => {
        return {
          name: item.stat.name,
          baseStat: item.base_stat,
          effort: item.effort
        }
      })
    },
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
