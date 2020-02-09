<template>
  <div class="bar">
    <h1>Bar Component</h1>
    <h3>{{val}}</h3>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch("fetchValue");
  },
  computed: {
    val() {
      return this.$store.state.value;
    }
  }
};
</script>