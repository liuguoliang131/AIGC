<template>
  <div class="menu">
    <div class="menu-item" @click="goProduct">
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-aitool-icon.svg"
        alt=""
      />
      <span class="name">AI工具</span>
    </div>
    <div class="menu-item" @click="goLearnCenter">
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-learn-icon.svg"
        alt=""
      />
      <span class="name">学习中心</span>
      <span class="t">限免</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goProduct() {
  router.push({
    path: "/product_center",
    replace: false,
  });
}

function goLearnCenter() {
  router.push({
    path: "/learn_center",
  });
}
</script>

<style scoped lang="less">
.menu {
  z-index: 9;
  position: fixed;
  bottom: 44px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  width: 260px;
  height: 55px;
  padding: 0 7px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 8px 14px 0px rgba(0, 0, 0, 0.05);
  .menu-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
    }
    .name {
      margin-top: 3.66px;
      color: rgba(255, 255, 255, 0.9);
      text-align: center;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .t {
      position: absolute;
      top: 0;
      right: -12px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 18px;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #fff;
      border-radius: 20px;
      background: linear-gradient(90deg, #ee7662 0%, #eb534d 81.97%);
      transform-origin: right top;
      transform: scale(0.5);
    }
  }
}
</style>