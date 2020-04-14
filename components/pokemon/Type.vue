<template>
  <div>
    <slot>
      <v-chip
        small
        outlined
        :color="`${color} darken-4`"
        class="d-flex justify-center mx-2 text-uppercase"
      >
        {{ name }}
      </v-chip>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Type',
  props: {
    name: { required: true, type: String },
    color: { required: true, type: String }
  }
}
</script>

<style scoped></style>
