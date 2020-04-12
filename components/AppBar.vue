<template>
  <v-app-bar color="white" app clipped dense>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')" />

    <v-toolbar-title>Pokedex</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="toggleFavourite = !toggleFavourite">
      <v-icon :color="favouriteColor">mdi-star-circle</v-icon>
    </v-btn>

    <v-btn icon @click="toggleListOfCaught = !toggleListOfCaught">
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
export default {
  name: 'AppBar',
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
    favouriteColor() {
      return this.toggleFavourite ? 'yellow' : ''
    },
    listOfCaughtColor() {
      return this.toggleListOfCaught ? 'green' : ''
    }
  }
}
</script>

<style scoped></style>
