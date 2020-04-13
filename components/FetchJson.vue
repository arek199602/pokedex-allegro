<template>
  <Promised :promise="promise">
    <!-- Use the "pending" slot to display a loading message -->
    <template v-slot:combined="{ isPending, isDelayOver, data, error }">
      <template slot="loader">
        <p v-if="isPending && isDelayOver">Loading...</p>
      </template>
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
  data() {
    return {
      promise: null
    }
  },
  watch: {
    url: {
      immediate: true,
      handler: 'fetchJson'
    }
  },
  methods: {
    fetchJson() {
      this.promise = this.$axios.get(this.url)
    }
  }
}
</script>

<style scoped></style>
