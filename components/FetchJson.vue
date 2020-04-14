<template>
  <Promised :promise="promise">
    <template v-slot:combined="{ isPending, data, error }">
      <slot v-if="isPending">
        <v-skeleton-loader
          class="mx-auto"
          type="list-item-three-line"
        ></v-skeleton-loader>
      </slot>
      <slot v-if="data" name="component" :response="data" />
      <template slot="error">
        <p v-if="error">Error: {{ error.message }}</p>
      </template>
    </template>
  </Promised>
</template>

<script>
export default {
  name: 'FetchJson',
  props: {
    url: { required: true, type: String }
  },
  computed: {
    promise() {
      return this.$axios.get(this.url)
    }
  }
}
</script>

<style scoped></style>
