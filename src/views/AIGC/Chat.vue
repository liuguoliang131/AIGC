<template>
  <div class="container">
    <div class="container-side">1</div>
    <div class="container-body">
      <div class="body-top">2</div>
      <div class="body-content">3</div>
    </div>
  </div>
</template>

<script setup>
import http from "../../http/index";
http.get("/chat/answerList", {
  tagId: 1,
  lastId: 1,
  pageSize: 10,
  mock: 156,
});
</script>

<style scoped lang="less">
.container {
  display: flex;

  .container-side {
    width: 310px;
    height: 100px;
  }
  .container-body {
    .body-top {
    }
    .body-content {
    }
  }
}
</style>
