<template>
  <div class="vip_model">
    <div class="vip_btn" v-show="btnShow">
      <img
        class="entry"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-vip-icon.png"
        alt=""
        @click="handVisible"
      />
      <img
        class="hide"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-close-icon.png"
        alt=""
        @click="handHide"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const btnShow = ref(true);
const handVisible = () => {
  router.push({
    path: "/buy_member",
  });
};
const handHide = () => {
  btnShow.value = false;
};
</script>

<style scoped lang="less">
.vip_model {
  z-index: 9;
  position: absolute;
  bottom: 0;
  right: 0;
  .vip_btn {
    position: fixed;
    bottom: 140px;
    right: 0px;
    .entry {
      width: 80px;
      height: 80px;
    }
    .hide {
      position: absolute;
      top: 5px;
      right: 10px;
      width: 10px;
      height: 10px;
    }
  }
  .vip_pop {
    z-index: -99;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 0;
    opacity: 0;
    transition: opacity 0.3s;
    background-color: rgba(0, 0, 0, 0.6);
    .cenbox {
      z-index: inherit;
      overflow: hidden;
      width: 100vw;
      height: 0;
      opacity: 0;
      transition: opacity 0.3s;
      text-align: center;
      .r1 {
        display: flex;
        justify-content: center;
        img {
          width: 155px;
          margin: 0 2px;
        }
      }
      .r2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 35px;
        img {
          width: 130px;
          height: 130px;
        }
        span {
          margin-top: 5px;
          color: #fff;
          text-align: center;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 15px; /* 125% */
        }
      }
      .r3 {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 32px;
        height: 32px;
        border: 2px solid #ffff;
        border-radius: 50%;
        margin: 59px auto 0 auto;
        img {
          width: 12px;
          height: 12px;
        }
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
  .vip_pop-visible {
    height: 100vh;
    opacity: 1;
    z-index: 10;
    .cenbox {
      height: auto;
      opacity: 1;
    }
  }
}
</style>