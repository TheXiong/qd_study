<template>
  <div>
    <div>{{message}}</div>
    <Son />
  </div>
</template>

<script>
import Son from "./son.vue";
export default {
  components: { Son },
  created() {
    console.log(this.$parent.$options.a); //能拿到10
  },
  data() {
    return {
      message: "hello vue"
    };
  }
};
</script>

