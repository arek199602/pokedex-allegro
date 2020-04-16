<template>
  <div>
    <slot>
      <v-icon
        v-if="isIconActive(id, 'stars')"
        :color="`${color} darken-3`"
        @click.stop="switchIcon(id, 'stars')"
      >
        mdi-star
      </v-icon>
      <v-icon
        v-else
        :color="`${color} darken-3`"
        @click.stop="switchIcon(id, 'stars')"
      >
        mdi-star-outline
      </v-icon>
      <v-icon
        v-if="isIconActive(id, 'circles')"
        :color="`${color} darken-3`"
        @click.stop="switchIcon(id, 'circles')"
      >
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon
        v-else
        :color="`${color} darken-3`"
        @click.stop="switchIcon(id, 'circles')"
      >
        mdi-checkbox-blank-circle-outline
      </v-icon>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Icons',
  props: {
    id: { required: true, type: Number },
    color: { required: true, type: String }
  },
  data() {
    return {
      stars: [],
      circles: []
    }
  },
  methods: {
    switchIcon(id, type) {
      const icon = this[type].find((icon) => icon.id === id)
      icon !== undefined
        ? (icon.active = !icon.active)
        : this[type].push({ id, active: true })
    },
    isIconActive(id, type) {
      const icon = this[type].find((icon) => icon.id === id)
      return icon !== undefined ? icon.active : false
    }
  }
}
</script>

<style scoped></style>
