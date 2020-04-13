<template>
  <h1>{{ url }}</h1>
</template>

<script>
export default {
  name: 'Test',
  props: ['url'],
  created() {
    console.log('rerender')
  }
}
</script>

<style scoped></style>
