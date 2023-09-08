<template>
  <div class="container">
    <div>draw</div>
    <div><button @click="madePicture4">立即生成</button></div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const madePicture4 = () => {
  router.push({
    path: "/draw/result",
    query: {},
  });
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
}
</style>