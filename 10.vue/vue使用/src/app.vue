<template>
  <div>
    <div>{{message}}</div>
    <Son />
  </div>
</template>

<script>
import Son from "./son.vue";
export default {
  name:'app',
  components: { Son },
  data() {
    return {
      message: "hello vue"
    };
  }
};
</script>

