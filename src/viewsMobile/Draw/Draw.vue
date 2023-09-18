<template>
  <div class="container">
    <div class="navbar">
      <img
        @click="slideVisible = true"
        class="call_left"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-navmenu.svg"
        alt=""
      />
      <div class="center" @click="visible = true">AI绘图</div>
      <img @click="handGoHome" src="@/assets/logo.png" alt="" class="go_home" />
    </div>
    <div class="formWrapper">
      <data-tab
        ref="dataTabRef"
        @create-success="createSuccess"
        v-model:madeDisabled="madeDisabled"
      />
    </div>
    <transition>
      <slide-bar v-model:visible="slideVisible"></slide-bar>
    </transition>
  </div>
</template>

<script setup>
import DataTab from "./components/DataTab.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import SlideBar from "@/components/mobile/SlideBar.vue";
import { useDrawStore } from "@/store/draw.js";

const router = useRouter();
const visible = ref(false);
const slideVisible = ref(false); // 菜单页是否显示
const dataTabRef = ref();
const madeDisabled = ref(false); // 控制左侧组件立即生成按钮是否禁止点击
const useStore = useDrawStore();
const drawStore = useDrawStore();

const handGoHome = () => {
  router.push({
    path: "/",
  });
};

const createSuccess = (data) => {
  const historyItem = {
    isFail: data.isFail,
    pictureId: data.pictureId,
    pictureUrl: data.pictureUrl,
    scrollTop: 0,
  };
  drawStore.saveHistoryItem(historyItem);
  madeDisabled.value = true;

  router.push({
    path: "/draw/result1",
    query: {},
  });
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  background: #f6f6f6;

  .navbar {
    position: relative;
    z-index: 8;
    width: 100%;
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #14181f;
    text-align: center;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    .call_left {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translate(0, -50%);
      width: 24px;
    }

    .go_home {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translate(0, -50%);
      width: 26px;
    }
  }

  .formWrapper {
    width: 100%;
    height: calc(100% - 44px);
    // overflow-y: scroll;
  }
}
</style>