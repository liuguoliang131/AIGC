<template>
  <div>
    <div>Home</div>
    <div>
      <span>产品</span>
      <span>学习中心</span>
    </div>

    <div>
      <span @click="handGoChat">AI对话</span>
      <span @click="handGoDraw">AI绘画</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    handGoChat() {
      this.$router.push({
        path: "/aigc/chat",
      });
    },
    handGoDraw() {
      this.$router.push({
        path: "/aigc/draw",
      });
    },
  },
};
</script>

<style>
</style>