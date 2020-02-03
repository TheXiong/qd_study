<template>
  <div>
    <div>{{message}}</div>
    <Son :a="a"/>
  </div>
</template>

<script>
import Son from "./son.vue";
export default {
  name:'app',
  components: { Son },
  data() {
    return {
      message: "hello vue",
      a:{
        b:{
          c:1
        },
        d:[1,2]
      }
    };
  }
};
</script>

