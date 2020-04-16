<template>
  <v-navigation-drawer
    app
    clipped
    temporary
    :value="drawer"
    @input="$emit('input', $event)"
  >
    <v-list dense>
      <v-list-item v-for="dex in dexes" :key="dex.text" link :to="dex.url">
        <v-list-item-action>
          <v-icon>{{ dex.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ dex.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item v-for="item in others" :key="item.text" link>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: {
    drawer: { required: true, type: Boolean }
  },
  data() {
    return {
      dexes: [
        { icon: 'mdi-pokeball', text: 'Pokedex', url: '/' },
        { icon: 'mdi-sword', text: 'Dex ruchów', url: '#2' },
        { icon: 'mdi-star-four-points', text: 'Dex zdolności', url: '#3' },
        { icon: 'mdi-screwdriver', text: 'Dex przedmiotów', url: '#4' },
        { icon: 'mdi-map-marker-radius', text: 'Dex lokacji', url: '#5' },
        { icon: 'mdi-tag-multiple', text: 'Dex typów', url: '#6' },
        { icon: 'mdi-tag-heart', text: 'Dex Natur', url: '#7' }
      ],
      others: [
        { icon: 'mdi-cog', text: 'Settings', url: '#8' },
        { icon: 'mdi-email-outline', text: 'Pomoc & Feedback', url: '#9' },
        { icon: 'mdi-help-circle-outline', text: 'Co nowego?', url: '#10' },
        { icon: 'mdi-information-outline', text: 'O nas', url: '#11' }
      ]
    }
  }
}
</script>

<style scoped></style>
