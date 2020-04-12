<template>
  <v-list dense>
    <v-list-item v-for="pokemon in pokemons" :key="pokemon.id" link>
      <v-list-item-action>
        <v-icon>{{ pokemon.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ pokemon.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'PokemonList',
  data() {
    return {
      pokemons: [
        { id: '1', name: 'Chansey', icon: 'mdi-pokemon-go' },
        { id: '2', name: 'Magikarp', icon: 'mdi-pokemon-go' },
        { id: '3', name: 'Metapod', icon: 'mdi-pokemon-go' },
        { id: '4', name: 'Abra', icon: 'mdi-pokemon-go' },
        { id: '5', name: 'Kakuna', icon: 'mdi-pokemon-go' },
        { id: '6', name: 'Caterpie', icon: 'mdi-pokemon-go' },
        { id: '7', name: 'Voltorb', icon: 'mdi-pokemon-go' },
        { id: '8', name: 'Weedle', icon: 'mdi-pokemon-go' },
        { id: '9', name: 'Alolan', icon: 'mdi-pokemon-go' },
        { id: '10', name: 'Kadabra', icon: 'mdi-pokemon-go' }
      ]
    }
  }
}
</script>

<style scoped></style>
