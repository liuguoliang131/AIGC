<template>
  <div class="container">
    <TopTitleBar />
    <div class="container-body" @scroll="onScroll">
      <div class="content1">
        <div class="left">
          <div class="player">
            <video
              ref="videoRef"
              class="real"
              width="1200"
              height="675"
              controls
              autoplay
              playsinline
              webkit-playsinline
              controlslist="nodownload noremoteplayback"
              @play="onPlay"
              @ended="onEnded"
              @fullscreenchange="onFullScreenChange"
              @contextmenu="onContextmenu"
              @timeupdate="onTimeupdate"
            >
              <source :src="active.path" type="video/mp4" />
              您的浏览器不支持H5视频播放。
            </video>
            <template v-if="isEnd">
              <template v-if="isFull">
                <div class="btns_full">
                  <div class="next" v-if="nextBtnShow" @click="handNext">
                    下一节
                    <img
                      class="next_icon"
                      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/nextplay.svg"
                      alt=""
                    />
                  </div>
                  <div class="replay" @click="handReplaay">
                    重播
                    <img
                      class="replay_icon"
                      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/replay-icon.svg"
                      alt=""
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="btns">
                  <div class="next" v-if="nextBtnShow" @click="handNext">
                    下一节
                    <img
                      class="next_icon"
                      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/nextplay.svg"
                      alt=""
                    />
                  </div>
                  <div class="replay" @click="handReplaay">
                    重播
                    <img
                      class="replay_icon"
                      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/replay-icon.svg"
                      alt=""
                    />
                  </div>
                </div>
              </template>
            </template>
          </div>
          <div class="actitle">
            {{ active.name }}
          </div>
        </div>
        <div class="right">
          <div class="title">课程列表</div>
          <div class="list">
            <template v-for="(item, idx) in playList" :key="idx">
              <div v-if="active.id === item.id" class="item item_active nowrap">
                <img
                  class="active_img"
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/player_list_active.svg"
                  alt=""
                />
                <span class="nowrap">{{ idx + 1 }}.{{ item.name }}</span>
              </div>
              <div v-else class="item nowrap" @click="handActive(item)">
                <span class="nowrap">{{ idx + 1 }}.{{ item.name }}</span>
              </div>
            </template>
          </div>
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
</template>

<script setup>
import playData from "./playData.js";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import utils from "@/common/utils";
import TopTitleBar from "@/components/TopTitleBar.vue";
import { useRouterConfigStore } from "@/store/routerConfigStore";
const routerConfig = useRouterConfigStore();

const route = useRoute();

// video
const videoRef = ref();

const playList = ref(
  playData.find((item) => item.group == route.query.group).children
);

const active = ref(playList.value[0]);
// 是否在全屏播放
const isFull = ref(false);
// 是否播放结束
const isEnd = ref(false);
// 播放下一节按钮是否显示 boolean
const nextBtnShow = ref(playList.value.length > 1);

// video indexDB数据库
const videoDB = ref(null);

// 页面滚动时设置tapBar组件背景颜色为白色
const onScroll = (e) => {
  routerConfig.titleBarOpacity = Math.min(1, e.target.scrollTop / 70);
};

// 选择视频小节
const handActive = (item) => {
  videoRef.value.pause();
  videoRef.value.src = item.path;
  videoRef.value.poster = item.poster;
  active.value = item;
};

// 播放触发
const onPlay = (e) => {
  console.log(e, "onPlay");
  setCurrentTime();
  isEnd.value = false;
};

// 播放完毕触发
const onEnded = (e) => {
  console.log(e, "onEnded");
  const idx = playList.value.findIndex((item) => item.id === active.value.id);
  console.log("idx", idx);
  nextBtnShow.value = idx + 1 !== playList.value.length;
  isEnd.value = true;
};

// 全屏事件 进入/退出
const onFullScreenChange = (e) => {
  console.log(e, "全屏");
  if (document.fullscreenElement === videoRef.value) {
    console.log("进入", document.fullscreenElement);
    isFull.value = true;
  } else {
    console.log("退出");
    isFull.value = false;
  }
};

// video右击菜单
const onContextmenu = (e) => {
  console.log(e, "onContextmenu");
  e.preventDefault();
};

// // 获取上次观看位置
// const getCurrentTime = () => {
//   const info = utils.getStorageSync("hanhou-ai-pc-learn", true);
//   if (info) {
//     active.value = playList.value.find((item) => item.id === info.id);
//     videoRef.value.src = active.value.path;
//     videoRef.value.poster = active.value.poster;
//     videoRef.value.currentTime = info.currentTime;
//   }
// };

// // 保存观看位置
// const setCurrentTime = () => {
//   utils.setStorageSync("hanhou-ai-pc-learn", {
//     id: active.value.id,
//     currentTime: videoRef.value.currentTime,
//   });
// };

// 获取上次观看位置
const getCurrentTime = (db) => {
  const transaction = db.transaction(["watchHistory"], "readonly");
  const objectStore = transaction.objectStore("watchHistory");

  var getRequest = objectStore.get(Number(route.query.group));

  getRequest.onsuccess = function (event) {
    var info = event.target.result;

    if (info) {
      active.value = playList.value.find((item) => item.id === info.id);
      videoRef.value.src = active.value.path;
      videoRef.value.poster = active.value.poster;
      videoRef.value.currentTime = info.currentTime;
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
    currentTime: videoRef.value.currentTime,
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
  if (Math.abs(videoRef.value.currentTime - prevTime) > 3) {
    setCurrentTime();
    prevTime = videoRef.value.currentTime;
  }
};

// 切换下一节
const handNext = () => {
  const idx = playList.value.findIndex((item) => item.id === active.value.id);
  active.value = playList.value[idx + 1];
  videoRef.value.src = active.value.path;
  videoRef.value.poster = active.value.poster;
};

// 重播
const handReplaay = () => {
  videoRef.value.currentTime = 0;
  videoRef.value.play();
};

const handGoICP = () => {
  window.open(`https://beian.miit.gov.cn/`);
};

onMounted(() => {
  openVideoIndexDB();
});
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
    padding-top: 50px;
    height: calc(100% - 50px);
    overflow-y: scroll;
    .content1 {
      display: flex;
      justify-content: center;
      .left {
        width: 1200px;
        margin-right: 47px;
        border-radius: 10px;

        .player {
          position: relative;
          width: 1200px;
          height: 675px;
          .real {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          .btns {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 45px;
            font-family: PingFang SC;
            font-size: 32px;
            font-weight: 400;
            line-height: 45px;
            color: rgba(255, 255, 255, 1);

            .next {
              display: flex;
              align-items: center;
              margin-right: 53px;
              cursor: pointer;
              user-select: none;
              .next_icon {
                width: 51px;
                height: 34px;
                vertical-align: middle;
              }
            }
            .replay {
              display: flex;
              align-items: center;
              cursor: pointer;
              user-select: none;
              .replay_icon {
                width: 21px;
                height: 21px;
                margin-left: 13px;
                vertical-align: middle;
              }
            }
          }
          .btns_full {
            z-index: 9999;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 45px;
            font-family: PingFang SC;
            font-size: 32px;
            font-weight: 400;
            line-height: 45px;
            color: rgba(255, 255, 255, 1);

            .next {
              display: flex;
              align-items: center;
              margin-right: 53px;
              cursor: pointer;
              user-select: none;
              .next_icon {
                width: 51px;
                height: 34px;
                vertical-align: middle;
              }
            }
            .replay {
              display: flex;
              align-items: center;
              cursor: pointer;
              user-select: none;
              .replay_icon {
                width: 21px;
                height: 21px;
                margin-left: 13px;
                vertical-align: middle;
              }
            }
          }
        }
        .actitle {
          width: 1200px;
          margin-top: 28px;
          color: #000;
          font-family: PingFang SC;
          font-size: 26px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-align: left;
        }
      }
      .right {
        width: 429px;
        height: 675px;
        border-radius: 10px;
        text-align: center;
        box-sizing: border-box;
        background: #fff;
        box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.1);
        .title {
          display: flex;
          align-items: center;
          width: 360px;
          height: 95px;
          border-bottom: 1px solid #a4a4a4;
          margin: auto;
          color: #1e1e1e;
          text-align: center;
          font-family: PingFang SC;
          font-size: 28px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .list {
          // width: 384px;
          height: 579px;
          // margin-left: 35px;
          overflow-x: hidden;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(223, 223, 223, 1);

            border-radius: 10px;
            transition: all 0.2s ease-in-out;
            border-radius: 11px;
          }
          &::-webkit-scrollbar-track {
            border-radius: 10px;
          }
          &::-webkit-scrollbar-track-piece {
            border-radius: 11px;
          }

          .item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            padding: 0 35px;
            color: rgba(0, 0, 0, 0.6);
            text-align: left;
            font-family: PingFang SC;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 50px;
            cursor: pointer;
          }
          .item_active {
            color: rgba(18, 108, 254, 1);
            background-color: rgb(219, 233, 255);
            font-weight: 600;
            .active_img {
              width: 25px;
              height: 30.446px;
              margin-right: 30px;
            }
          }
        }
      }
    }
    .footer {
      padding-top: 100px;
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