<template>
  <v-speed-dial v-model="open" fixed bottom right>
    <template v-slot:activator>
      <v-btn color="#40637f" dark fab>
        <v-icon v-if="open">mdi-close</v-icon>
        <v-icon v-else>mdi-pokeball</v-icon>
      </v-btn>
    </template>
    <v-btn fab small>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn fab small>
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    <v-btn fab small>
      <v-icon>mdi-sort</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'FloatingButton',
  data() {
    return {
      open: false
    }
  }
}
</script>

<style scoped></style>
