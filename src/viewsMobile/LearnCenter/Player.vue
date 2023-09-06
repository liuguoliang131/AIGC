<template>
  <div class="container">
    <NavBar />
    <div class="container-body" ref="scrollView">
      <div class="group_list" ref="scrollPage">
        <div class="group_item" v-for="item in playList" :key="item.id">
          <div class="player">
            <video
              preload="auto"
              :data-id="item.id"
              class="real"
              width="343"
              height="193"
              :controls="active === item"
              :autoplay="false"
              playsinline
              webkit-playsinline
              x5-video-orientation="landscape"
              controlslist="nodownload noremoteplayback"
              @play="onPlay"
              @ended="onEnded"
              @contextmenu="onContextmenu"
              @timeupdate="onTimeupdate"
            >
              <source :src="item.path + '#t=0.1'" type="video/mp4" />
              您的浏览器不支持H5视频播放。
            </video>
            <div class="mask" v-show="active !== item">
              <div class="title nowrap">{{ item.name }}</div>
              <img
                @click="handActive(item)"
                class="player-start"
                src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-player-start.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import playData from "./playData.js";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import utils from "@/common/utils";
import NavBar from "@/components/mobile/NavBar.vue";
import { useRouterConfigStore } from "@/store/routerConfigStore";
import { Image as VanImage } from "vant";
const routerConfig = useRouterConfigStore();

const route = useRoute();

const scrollView = ref();
const scrollPage = ref();

// 被选中的video组件
const activeVideoDom = ref(null);

const playList = ref(
  playData.find((item) => item.group == route.query.group).children
);
const active = ref(playList.value[0]);

// video indexDB数据库
const videoDB = ref(null);

// 返回被选中的video组件dom
const echoActiveVideo = () => {
  const videoDoms = Array.from(document.getElementsByClassName("real"));
  activeVideoDom.value = videoDoms.find(
    (dom) => dom.getAttribute("data-id") == active.value.id
  );

  return activeVideoDom.value;
};

// 选中视频
const handActive = (item) => {
  active.value = item;
  const videoDoms = Array.from(document.getElementsByClassName("real"));
  console.log(videoDoms);
  videoDoms.forEach((dom) => {
    dom.pause();
  });
  echoActiveVideo().play();
};

// 播放触发
const onPlay = (e) => {
  console.log(e, "onPlay");
  setCurrentTime();
};

// 播放完毕触发
const onEnded = (e) => {
  console.log(e, "onEnded");
};

// video右击菜单
const onContextmenu = (e) => {
  console.log(e, "onContextmenu");
  e.preventDefault();
};

// 滚动至播放的视频区域
const transToActive = () => {
  const acDom = echoActiveVideo();
  acDom.scrollIntoView({
    behavior: "smooth",
  });
};

// 获取上次观看位置
const getCurrentTime = (db) => {
  const transaction = db.transaction(["watchHistory"], "readonly");
  const objectStore = transaction.objectStore("watchHistory");

  var getRequest = objectStore.get(Number(route.query.group));

  getRequest.onsuccess = function (event) {
    var info = event.target.result;

    if (info) {
      active.value = playList.value.find((item) => item.id === info.id);
      echoActiveVideo();
      activeVideoDom.value.currentTime = info.currentTime;
      activeVideoDom.value.play();
      transToActive();
    }
  };
};

// 保存观看位置
const setCurrentTime = () => {
  const transaction = videoDB.value.transaction(["watchHistory"], "readwrite");
  const objectStore = transaction.objectStore("watchHistory");
  const updateRequest = objectStore.put({
    group: Number(route.query.group),
    id: active.value.id,
    currentTime: activeVideoDom.value.currentTime,
  });
  updateRequest.onsuccess = function (event) {
    // console.log("数据已成功更新");
  };

  updateRequest.onerror = function (event) {
    console.error("更新数据时出错", event.target.error);
  };
};

// 打开存储观看位置的indexDB
const openVideoIndexDB = () => {
  // 打开或创建 IndexedDB 数据库
  var request = indexedDB.open("hanhouLearnVideoDatabase", 1);

  // 当数据库打开/创建成功时的回调函数
  request.onsuccess = function (event) {
    const db = event.target.result;
    videoDB.value = db;
    console.log("数据库已成功打开");
    getCurrentTime(db);
  };
  // 当数据库需要升级时的回调函数
  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    videoDB.value = db;
    // 创建一个对象存储空间
    var objectStore = db.createObjectStore("watchHistory", {
      keyPath: "group",
    });
    console.log("数据库升级或创建成功");
  };
};

// 播放位置更新触发
let prevTime = 0;
const onTimeupdate = (e) => {
  if (Math.abs(activeVideoDom.value.currentTime - prevTime) > 3) {
    setCurrentTime();
    prevTime = activeVideoDom.value.currentTime;
  }
};

onMounted(() => {
  echoActiveVideo();
  openVideoIndexDB();
});
</script>


<style scoped lang="less">
.container {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  background: #f6f6f6;
  .container-body {
    height: calc(100% - 44px);
    overflow-y: scroll;
    .group_list {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4px 16px 8px 16px;
      .group_item {
        position: relative;
        width: 343px;
        height: 193px;
        padding: 18.5px 0;
        border-bottom: 0.7px solid rgba(0, 0, 0, 0.1);
        .player {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 8px;
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
            .player-start {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 38px;
              height: 38px;
            }
          }
          .real {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.3);
          }
        }
      }
      .group_item:nth-last-child(1) {
        border: none;
      }
    }
  }
}
</style>