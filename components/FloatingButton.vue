<template>
  <v-speed-dial ref="speedDial" v-model="open" fixed bottom right>
    <template v-slot:activator>
      <v-btn color="#40637f" dark fab :class="animation">
        <v-icon v-if="open">mdi-close</v-icon>
        <v-icon v-else>mdi-pokeball</v-icon>
      </v-btn>
    </template>
    <v-btn fab small @click="$vuetify.goTo(0)">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <v-btn fab small @click="openFilter(true)">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <template v-if="$vuetify.breakpoint.xs">
      <v-btn
        v-if="listType === 'view-list'"
        fab
        small
        @click="setListType('grid-outline')"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      <v-btn v-else fab small @click="setListType('view-list')">
        <v-icon>mdi-view-grid-outline</v-icon>
      </v-btn>
    </template>
  </v-speed-dial>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('filter')
const listTypeModule = createNamespacedHelpers('listType')
export default {
  name: 'FloatingButton',
  props: {
    hide: { type: Boolean, default: false }
  },
  data() {
    return {
      open: false,
      toggleViewList: false
    }
  },
  computed: {
    ...listTypeModule.mapState(['listType']),
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
    ...mapActions(['openFilter']),
    ...listTypeModule.mapActions(['setListType'])
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
