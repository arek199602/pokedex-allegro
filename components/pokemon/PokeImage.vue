<template>
  <div>
    <slot>
      <v-img
        height="64"
        contain
        position="center center"
        :class="`${color} lighten-3`"
        class="pokemon-img"
        :src="`https://pokeres.bastionbot.org/images/pokemon/${id}.png`"
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
    color: { required: true, type: String }
  }
}
</script>

<style scoped></style>
