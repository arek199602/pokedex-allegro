<template>
  <v-app id="pokedex">
    <navigation-drawer :drawer="drawer" @input="drawer = $event" />
    <app-bar @toggleDrawer="drawer = !drawer" />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '~/components/AppBar'
import NavigationDrawer from '~/components/NavigationDrawer'
export default {
  components: {
    AppBar,
    NavigationDrawer
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 0;
}
</style>
