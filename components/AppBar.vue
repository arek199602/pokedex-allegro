<template>
  <v-app-bar color="white" app clipped dense>
    <v-app-bar-nav-icon v-if="!isFilterOpen" @click="$emit('toggleDrawer')" />
    <v-app-bar-nav-icon v-else @click="openFilter(false)">
      <v-icon>
        mdi-arrow-left
      </v-icon>
    </v-app-bar-nav-icon>

    <autocomplete v-if="isFilterOpen" />
    <v-toolbar-title v-else>Pokedex</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="!isFilterOpen"
      icon
      @click="toggleFavourite = !toggleFavourite"
    >
      <v-icon :color="favouriteColor">mdi-star-circle</v-icon>
    </v-btn>

    <v-btn
      v-if="!isFilterOpen"
      icon
      @click="toggleListOfCaught = !toggleListOfCaught"
    >
      <v-icon :color="listOfCaughtColor">
        mdi-checkbox-multiple-marked-circle
      </v-icon>
    </v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="option in options" :key="option" @click="() => {}">
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Autocomplete from './Autocomplete'
const { mapGetters, mapActions } = createNamespacedHelpers('filter')
export default {
  name: 'AppBar',
  components: {
    Autocomplete
  },
  data() {
    return {
      options: [
        'Oznacz wszystkie jako złapane',
        'Pokaż wszystko',
        'Ukryj wszystko',
        'Ustawienia'
      ],
      toggleFavourite: false,
      toggleListOfCaught: false
    }
  },
  computed: {
    ...mapGetters(['isFilterOpen']),
    favouriteColor() {
      return this.toggleFavourite ? 'yellow' : ''
    },
    listOfCaughtColor() {
      return this.toggleListOfCaught ? 'green' : ''
    }
  },
  methods: {
    ...mapActions(['openFilter'])
  }
}
</script>

<style scoped></style>
