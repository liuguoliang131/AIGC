<template>
  <div class="nav_bar">
    <div class="float">
      <svg
        @click="goback"
        class="goback"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
      >
        <path
          d="M11 19.5L3.23405 11.7341L11 3.9681"
          stroke="#333333"
          stroke-width="1.5"
        />
      </svg>
      <span class="title nowrap">{{ route.meta.title || "Hanhou·AI" }}</span>
    </div>
  </div>
</template>

<script setup>
import { showDialog, showToast } from "vant";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 去首页
const goback = () => {
  router.go(-1);
};
</script>

<style scoped lang="less">
.nav_bar {
  height: 44px;
  .float {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 44px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #fff;
    .goback {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translate(0, -50%);
      width: 22px;
      height: 22px;
    }
    .title {
      width: 100%;
      color: #14181f;
      text-align: center;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
}
</style>