<template>
  <v-card class="mt-4" :class="`${getColor(color)}--text text--darken-4`">
    <v-card-title>Abilities</v-card-title>
    <v-card-text class="d-flex flex-column">
      <v-chip
        v-for="item in abilities"
        :key="item.name"
        class="justify-center mb-1"
        :color="`${getColor(color)} lighten-3`"
        :class="`${getColor(color)}--text text--darken-4`"
      >
        {{ item.ability.name }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Abilities',
  props: {
    abilities: { required: true, type: Array },
    color: { required: true, type: String },
    getColor: { required: true, type: Function }
  }
}
</script>

<style scoped></style>
