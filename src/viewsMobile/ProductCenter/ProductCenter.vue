<template>
  <div class="container">
    <top-title-bar />
    <div class="container-body">
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_ai-chat-card.png"
        class="card-image"
        @click="navToItem(1)"
      />
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_ai-draw-card.png"
        class="card-image"
        @click="navToItem(2)"
      />
      <m-footer></m-footer>
    </div>
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/mobile/TopTitleBar.vue";
import MFooter from "@/components/mobile/MFooter.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navToItem = (value) => {
  if (value == 1) {
    router.push({
      path: "/chat",
    });
  } else if (value == 2) {
    router.push({
      path: "/draw",
    });
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .container-body {
    height: calc(100% - 44px);
    overflow-y: scroll;
    overflow-x: hidden;
    text-align: center;
    background: no-repeat
      url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-product_center-bg.png")
      0 0 / cover;
    .card-image {
      width: 375px;
      height: 200px;
      object-fit: contain;
      margin: auto;
      &:active {
        opacity: 0.7;
      }
    }
    .card-image:nth-child(1) {
      padding-top: 45px;
    }
    .card-image:nth-last-child(1) {
      padding-bottom: 45px;
    }
  }
}
</style>