<template>
  <div class="container">
    <TopTitleBar />
    <div class="tabs">
      <div
        :class="['tab_item', activeTab == item ? 'tab_item-active' : '']"
        v-for="(item, idx) in tabs"
        :key="idx"
        @click="handActive(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="container-body">
      <div class="group_list">
        <div class="group_item" v-for="item in list" :key="item.id">
          <div class="item_box" @click="handGoPlay(item)">
            <van-image class="cover" :src="item.cover" />
            <div class="mask">
              <div class="title nowrap">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { ElImage, ElMessage } from "element-plus";
import { Image as VanImage } from "vant";
import TopTitleBar from "@/components/mobile/TopTitleBar.vue";
import playData from "./playData.js";
import { useRouter } from "vue-router";
import { showToast } from "vant";
const router = useRouter();

const tabs = ref([
  {
    id: null,
    name: "全部",
  },
  {
    id: 1,
    name: "AI对话课程",
  },
  {
    id: 2,
    name: "AI绘画课程",
  },
]);

const list = ref([]);

const activeTab = ref(tabs.value[0]);
const handActive = (item) => {
  if (item.value === activeTab.value) return;
  activeTab.value = item;
};

// 根据tab值筛选列表
const screenList = (val) => {
  if (val.id === null) {
    return (list.value = playData);
  }
  list.value = playData.filter((item) => {
    return item.group === val.id;
  });
};

watch(
  activeTab,
  (newVal) => {
    screenList(newVal);
  },
  {
    immediate: true,
  }
);

// 去往播放页
const handGoPlay = (item) => {
  if (!item.children || !item.children.length) {
    return showToast("这个视频是空的~");
  }
  router.push({
    path: "/learn_center/player",
    query: {
      group: item.group,
    },
  });
};
</script>


<style scoped lang="less">
.container {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  background: #f6f6f6;
  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 0;
    height: 46px;
    user-select: none;
    .tab_item {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 118px;
      height: 46px;
      color: #666;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 46px;
    }
    .tab_item-active {
      position: relative;
      color: #333;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      &::before {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        width: 31px;
        height: 3px;
        border-radius: 3px;
        background: linear-gradient(
          90deg,
          #126cfe -0.2%,
          rgba(13, 119, 218, 0.39) 105.39%
        );
      }
    }
  }
  .container-body {
    height: calc(100% - 44px - 64px);
    overflow-y: scroll;
    .group_list {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4px 16px 8px 16px;
      .group_item {
        padding: 18.5px 0;
        border-bottom: 0.7px solid rgba(0, 0, 0, 0.1);
        .item_box {
          position: relative;
          height: 193px;

          &:hover {
            opacity: 0.9;
          }
          .cover {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            background: linear-gradient(
              0deg,
              #000 -0.03%,
              rgba(0, 0, 0, 0) 41.43%
            );
            .title {
              position: absolute;
              bottom: 10px;
              left: 10px;
              width: 267px;
              height: 20px;
              line-height: 20px;
              color: #fff;
              font-family: PingFang SC;
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              text-align: left;
            }
          }
        }
      }
      .group_item:nth-child(1) {
        padding-top: 4px;
      }
      .group_item:nth-last-child(1) {
        border: none;
      }
    }
  }
}
</style>