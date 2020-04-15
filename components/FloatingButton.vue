<template>
  <v-speed-dial ref="speedDial" v-model="open" fixed bottom right>
    <template v-slot:activator>
      <v-btn color="#40637f" dark fab :class="animation">
        <v-icon v-if="open">mdi-close</v-icon>
        <v-icon v-else>mdi-pokeball</v-icon>
      </v-btn>
    </template>
    <v-btn fab small>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn fab small @click="openFilter(true)">
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    <v-btn fab small>
      <v-icon>mdi-sort</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('filter')
export default {
  name: 'FloatingButton',
  props: {
    hide: { type: Boolean, default: false }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    animation() {
      return {
        hide: this.hide,
        show: !this.hide
      }
    }
  },
  watch: {
    hide(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$refs.speedDial.$el.style.display = 'none'
        }, 600)
      } else {
        this.$refs.speedDial.$el.style.display = 'block'
      }
    }
  },
  methods: {
    ...mapActions(['openFilter'])
  }
}
</script>

<style scoped lang="scss">
.show {
  transform: scale(0);
  animation: zoomIn 500ms forwards;
}
.hide {
  transform: scale(1);
  animation: zoomOut 500ms forwards;
}
@keyframes zoomIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes zoomOut {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
