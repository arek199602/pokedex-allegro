<template>
  <Promised :promise="promise">
    <!-- Use the "pending" slot to display a loading message -->
    <template v-slot:pending>
      <slot name="loader">
        <p>Loading...</p>
      </slot>
    </template>
    <!-- The default scoped slot will be used as the result -->
    <template v-slot="data">
      <slot name="component" :response="data"> </slot>
    </template>
    <!-- The "rejected" scoped slot will be used if there is an error -->
    <template v-slot:rejected="error">
      <slot name="error">
        <p>Error: {{ error.message }}</p>
      </slot>
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
