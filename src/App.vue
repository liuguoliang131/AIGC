<template>
  <router-view />
</template>
<script>
import { onMounted } from "vue";
export default {
  name: "App",
  setup(props, { slots, emit }) {
    onMounted(() => {});
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  height: 100vh;
  font-family: PingFang SC;
  font-size: 19px;
  font-weight: 500;
  line-height: 44px;
  text-align: left;
  color: #333333;
}
</style>
