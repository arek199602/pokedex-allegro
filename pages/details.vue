<template>
  <v-container>
    <v-row no-gutters class="pa-4">
      <v-col cols="12">
        <portal-target name="details" slim />
        <fetch-json :url="url">
          <template v-slot:component="{ response: { data: pokemonDetails } }">
            <fetch-json :url="pokemonDetails.species.url">
              <template v-slot:component="{ response: { data: species } }">
                <portal to="details">
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
                      <abilities
                        :abilities="pokemonDetails.abilities"
                        :color="species.color.name"
                        :get-color="getColor"
                      />
                    </v-col>
                    <v-col cols="12" md="7">
                      <base-stats
                        :stats="pokemonDetails.stats"
                        :color="species.color.name"
                        :get-color="getColor"
                      />
                    </v-col>
                    <v-col cols="12">
                      <moves
                        :moves="pokemonDetails.moves"
                        :color="species.color.name"
                        :get-color="getColor"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <specie
                        :flavor-text-entries="species.flavor_text_entries"
                        :pokemon-details="pokemonDetails"
                        :color="species.color.name"
                        :get-color="getColor"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <portal-target name="evolution" slim />
                      <fetch-json :url="species.evolution_chain.url">
                        <template
                          v-slot:component="{ response: { data: evolution } }"
                        >
                          <portal to="evolution">
                            <evolution
                              :url="evolution.chain.species.url"
                              :evolution-chain="evolution.chain"
                              :color="species.color.name"
                              :get-color="getColor"
                            />
                          </portal>
                        </template>
                      </fetch-json>
                    </v-col>
                  </v-row>
                </portal>
              </template>
            </fetch-json>
          </template>
        </fetch-json>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseStats from '~/components/details/BaseStats'
import Evolution from '~/components/details/Evolution'
import Specie from '~/components/details/Specie'
import Moves from '~/components/details/Moves'
import Abilities from '~/components/details/Abilities'
import GridTemplate from '~/components/pokemon/GridTemplate'
import FetchJson from '~/components/FetchJson'
import { pokemon } from '~/mixins/pokemon'

export default {
  name: 'Details',
  components: {
    BaseStats,
    Evolution,
    Moves,
    Specie,
    Abilities,
    GridTemplate,
    FetchJson
  },
  mixins: [pokemon],
  computed: {
    url() {
      return localStorage.getItem('pokemon_url')
    }
  }
}
</script>

<style scoped></style>
