<template>
  <v-card :class="`${getColor(color)}--text text--darken-4`">
    <v-card-title>Moves</v-card-title>
    <v-card-text>
      <v-chip
        v-for="item in moves"
        :key="item.name"
        small
        class="justify-center mb-1"
        :color="`${getColor(color)} lighten-3`"
        :class="`${getColor(color)}--text text--darken-4`"
      >
        {{ item.move.name }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Moves',
  props: {
    moves: { required: true, type: Array },
    color: { required: true, type: String },
    getColor: { required: true, type: Function }
  }
}
</script>

<style scoped></style>
