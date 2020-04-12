<template>
  <v-navigation-drawer
    app
    clipped
    temporary
    :value="drawer"
    @input="$emit('input', $event)"
  >
    <v-list dense>
      <v-list-item v-for="dex in dexes" :key="dex.text" link>
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
        { icon: 'mdi-pokeball', text: 'Pokedex' },
        { icon: 'mdi-sword', text: 'Dex ruchów' },
        { icon: 'mdi-star-four-points', text: 'Dex zdolności' },
        { icon: 'mdi-screwdriver', text: 'Dex przedmiotów' },
        { icon: 'mdi-map-marker-radius', text: 'Dex lokacji' },
        { icon: 'mdi-tag-multiple', text: 'Dex typów' },
        { icon: 'mdi-tag-heart', text: 'Dex Natur' }
      ],
      others: [
        { icon: 'mdi-cog', text: 'Settings' },
        { icon: 'mdi-email-outline', text: 'Pomoc & Feedback' },
        { icon: 'mdi-help-circle-outline', text: 'Co nowego?' },
        { icon: 'mdi-information-outline', text: 'O nas' }
      ]
    }
  }
}
</script>

<style scoped></style>
