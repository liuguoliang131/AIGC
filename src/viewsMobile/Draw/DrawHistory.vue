<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="empty" v-if="history.empty">
      <div class="empty-center">暂无历史记录</div>
    </div>
    <div class="container-body" v-else @scroll="onScroll">
      <div class="page">
        <div class="list">
          <div class="waterfall">
            <history-item
              v-for="item in history.list1"
              :key="item.pictureId"
              :item="item"
              @click="handActive(item)"
            ></history-item>
          </div>
          <div class="waterfall">
            <history-item
              v-for="item in history.list2"
              :key="item.pictureId"
              :item="item"
              @click="handActive(item)"
            ></history-item>
          </div>
        </div>
        <div class="listloading" v-show="history.loading">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-listloading-icon.png"
            alt=""
          />
          <span>加载中</span>
        </div>
      </div>
    </div>
    <div class="newDraw" @click="handNewDraw">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <rect y="6" width="14" height="2" fill="white" />
        <rect
          x="6"
          y="14"
          width="14"
          height="2"
          transform="rotate(-90 6 14)"
          fill="white"
        />
      </svg>
      <span>新建绘画</span>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/mobile/NavBar.vue";
import { ref, reactive, onUpdated } from "vue";
import request from "@/http/index";
import api from "@/http/api";
import { useUserStore } from "@/store/user";
import HistoryItem from "./components/HistoryItem.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { useDrawStore } from "@/store/draw";

const router = useRouter();
const drawStore = useDrawStore();
const history = reactive({
  lastId: 0,
  pageSize: 10,
  loading: false,
  finish: false,
  empty: false,
  list1: [],
  list2: [],
});

// 选择图片
const handActive = (item) => {
  console.log(item);
};

// 去创建
const handNewDraw = () => {
  router.push({
    path: "/draw",
  });
};

//时间日期 转换
const timeFormat = (time) => {
  const date = time ? new Date(time) : new Date();
  let obj = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() + 1,
    dd: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  };

  Object.keys(obj).forEach((k) => {
    obj[k] = obj[k] < 10 ? "0" + obj[k] : obj[k];
  });
  return `${obj.yyyy}-${obj.MM}-${obj.dd} ${obj.HH}:${obj.mm}`;
};

// 获取图片列表
const getHistory = async () => {
  history.loading = true;
  const res = await request.get(api.picture_pictureList, {
    lastId: history.lastId,
    pageSize: history.pageSize,
  });

  if (res.code !== 200) {
    showToast(res.msg);
  } else {
    if (res.data.list && res.data.list.length) {
      let list1 = [];
      let list2 = [];
      res.data.list.forEach((item, index) => {
        item.createdAt = timeFormat(item.createdAt);
        if ((index + 1) % 2) {
          list1.push(item);
        } else {
          list2.push(item);
        }
      });
      history.list1 = [...history.list1, ...list1];
      history.list2 = [...history.list2, ...list2];
      history.lastId = res.data.list[res.data.list.length - 1].pictureId;
      if (res.data.list.length < history.pageSize) {
        history.finish = true;
      }
    } else {
      history.finish = true;
      if (history.lastId === 0) {
        history.empty = true;
      }
    }
  }
  history.loading = false;
};

// 卷轴滚动事件
const onScroll = async (e) => {
  const pagedom = document.querySelector(".page");
  const scrolldom = document.querySelector(".container-body");
  const style = window.getComputedStyle(pagedom, null);
  const bottom = parseFloat(style.getPropertyValue("padding-bottom"));

  if (
    e.target.scrollTop + scrolldom.offsetHeight >=
    pagedom.offsetHeight - bottom
  ) {
    if (history.loading) return;
    if (history.finish) return;
    getHistory();
  }
};

// 对话列表不满一屏 加载
getHistory();
onUpdated(() => {
  const pagedom = document.querySelector(".page");
  const scrolldom = document.querySelector(".container-body");
  const style = window.getComputedStyle(pagedom, null);
  const bottom = parseFloat(style.getPropertyValue("padding-bottom"));

  if (pagedom.offsetHeight - bottom < scrolldom.offsetHeight) {
    getHistory();
  }
});
</script>

<style scoped lang="less">
.container {
  height: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
  .container-body {
    height: calc(100% - 44px);
    overflow-y: scroll;
    .page {
      padding: 8px 8px 73px 8px;
      .list {
        display: flex;
        justify-content: space-between;
        .waterfall {
          width: 175px;
        }
      }

      .listloading {
        display: flex;
        align-items: center;
        justify-content: center;
        @keyframes round {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        img {
          width: 24px;
          height: 24px;
          margin-right: 6px;
          transform-origin: center;
          animation: round 0.8s infinite linear;
        }
        span {
          color: rgba(0, 0, 0, 0.9);
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
  }
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 44px);
    .empty-center {
      color: #858585;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      text-align: center;
      transform: translate(0, -200%);
    }
  }

  .newDraw {
    position: fixed;
    bottom: 21px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 335px;
    height: 40px;
    color: #fff;
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 5px;
    background: #126cfe;
    margin: auto;
    cursor: pointer;
    svg {
      width: 14px;
      height: 14px;
    }

    span {
      margin-left: 7px;
    }

    &:active {
      opacity: 0.8;
    }
  }
}
</style>