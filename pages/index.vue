<template>
  <v-row>
    <v-col>
      <pokemon-list />
      <floating-button />
    </v-col>
  </v-row>
</template>

<script>
import PokemonList from '~/components/PokemonList'
import FloatingButton from '~/components/FloatingButton'
export default {
  components: {
    PokemonList,
    FloatingButton
  }
}
</script>
