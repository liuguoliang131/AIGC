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
    <div class="content">
      <data-tab
        ref="dataTabRef"
        @create-success="createSuccess"
        v-model:madeDisabled="madeDisabled"
      />
    </div>
  </div>
  <transition>
    <slide-bar v-model:visible="slideVisible"></slide-bar>
  </transition>
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
    path: "/draw/result",
    query: {},
  });
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  background: #f6f6f6;
  height: 100vh; /* 设置容器高度为视口高度，使内容区域占据剩余空间 */
}

.navbar {
  flex: 0 0 auto;
  z-index: 8;
  flex: 0 0 auto;
  width: 100%;
  height: 44px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #14181f;
  text-align: center;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  .call_left {
    margin-left: 16px;
    width: 24px;
  }

  .go_home {
    margin-right: 16px;
    width: 26px;
  }
}

.content {
  flex: 1 1 auto; /* 填充剩余空间，可滚动 */
  overflow-y: auto; /* 添加垂直滚动条 */
}
</style>
