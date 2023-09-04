<template>
  <div class="container">
    <TopTitleBar />
    <div class="container-body" @scroll="onScroll">
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
      <div class="content1">
        <div class="group_list">
          <div
            class="group_item"
            v-for="item in list"
            :key="item.id"
            @click="handGoPlay(item)"
          >
            <el-image
              class="cover"
              :src="item.cover"
              alt=""
              fit="fill"
            ></el-image>
            <div class="title lineClamp2">{{ item.name }}</div>
          </div>
        </div>
        <div class="footer">
          <div class="footer-record">
            <a @click="handGoICP"
              >京ICP备19041918号-1京公网安备11010502039881号</a
            >
          </div>
          <div class="footer-record">
            <a @click="handGoICP">网络经营许可证京网文[2020]4683-870号</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { ElImage, ElMessage } from "element-plus";
import TopTitleBar from "@/components/TopTitleBar.vue";
import playData from "./playData.js";
import { useRouter } from "vue-router";
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
    return ElMessage({
      type: "warning",
      message: "这个视频是空的~",
    });
  }
  router.push({
    path: "/learn_center/player",
    query: {
      group: item.group,
    },
  });
};

const handGoICP = () => {
  window.open(`https://beian.miit.gov.cn/`);
};
</script>


<style scoped lang="less">
.container {
  position: relative;
  height: calc(100% - 70px);
  padding-top: 70px;
  background-color: #fff;
  background-image: url("https://quanres.hanhoukeji.com/hanhou-ai-pc/index-background1.png");
  background-size: cover;
  .container-body {
    height: 100%;
    .tabs {
      display: flex;
      padding: 60px 122.5px 0 122.5px;
      height: 52px;
      user-select: none;
      .tab_item {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 200px;
        height: 52px;
        border: 1px solid #126cfe;
        margin-right: 44px;
        border-radius: 6px;
        color: #126cfe;
        text-align: center;
        font-family: PingFang SC;
        font-size: 19px;
        font-style: normal;
        font-weight: 400;
        cursor: pointer;
      }
      .tab_item-active {
        background: #126cfe;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 19px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
    .content1 {
      height: calc(100% - 112px);
      overflow-y: scroll;
      .group_list {
        display: grid;
        grid-template-columns: 400px 400px 400px 400px;
        grid-template-rows: 302px;
        grid-row-gap: 66px;
        grid-column-gap: 25px;
        width: 1675px;
        padding-top: 60px;
        margin: auto;
        .group_item {
          width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          &:hover {
            opacity: 0.9;
          }
          .cover {
            width: 400px;
            height: 225.5px;
            border-radius: 10px;
          }
          .title {
            width: 400px;
            height: 54px;
            margin-top: 20.5px;
            color: #000;
            font-family: PingFang SC;
            font-size: 19px;
            font-style: normal;
            font-weight: 400;
            line-height: 27px;
          }
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-top: 32px;
      padding-bottom: 32px;
      width: 100%;
      color: #666666;
      text-align: center;
      font-family: PingFang SC;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      .footer-record {
        margin-top: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
