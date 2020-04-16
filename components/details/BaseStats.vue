<template>
  <v-card
    height="100%"
    :color="`${color} lighten-3`"
    :class="`${getColor(color)}--text text--darken-4`"
  >
    <v-card-title>
      Base Stats
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="getStats(stats)"
        :items-per-page="5"
        class="elevation-1 mx-4"
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BaseStats',
  props: {
    stats: { required: true, type: Array },
    color: { required: true, type: String },
    getColor: { required: true, type: Function }
  },
  data() {
    return {
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
    }
  },
  methods: {
    getStats(stats) {
      return stats.map((item) => {
        return {
          name: item.stat.name,
          baseStat: item.base_stat,
          effort: item.effort
        }
      })
    }
  }
}
</script>

<style scoped></style>
