<template>
  <div>
    <slot>
      <v-img
        :height="height"
        contain
        position="center center"
        :class="backgroundColor"
        class="pokemon-img"
        :lazy-src="lazySrc"
        :src="src"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'PokeImage',
  props: {
    id: { required: true, type: Number },
    color: { type: String, default: '' },
    height: { type: String, default: '64' }
  },
  computed: {
    src() {
      return `https://pokeres.bastionbot.org/images/pokemon/${this.id}.png`
    },
    lazySrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`
    },
    backgroundColor() {
      return this.color.length && `${this.color} lighten-3`
    }
  }
}
</script>

<style scoped></style>
