<script setup>
import { ElDialog, ElMessage, ElImage, dayjs } from "element-plus";
import { ref, reactive, watch, nextTick, onMounted, onUnmounted } from "vue";
import request from "@/http/index";
import api from "@/http/api";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const props = defineProps({
  active: {
    type: Object,
    description: "被选中的图片",
  },
});

const emit = defineEmits(["update:active", "post-detail"]);

const client = ref(); // 卷轴dom
const page = ref(); // 卷轴内容dom

const history = reactive({
  lastId: 0,
  pageSize: 20,
  loading: false,
  finish: false,
  empty: false,
  list: [],
});

// 选择图片
const handActive = (item) => {
  if (item.pictureId === props.active.pictureId) {
    return false;
  }
  emit("update:active", item);
};

let timer = null;
// 开始轮询详情
const openTimer = (active) => {
  // return console.log("openTimer");

  const sideFn = (activeItem) => {
    getDetail(activeItem).then((result) => {
      if (result === null) {
        clearInterval(timer);
      } else {
        activeItem.pictureUrl = result.pictureUrl;
        activeItem.isFail = result.isFail;
        if (result.isFail) {
          return clearInterval(timer);
        }
        if (result.pictureUrl) {
          console.log("if (result.pictureUrl) 关闭定时器");
          return clearInterval(timer);
        }
      }
    });
  };

  clearInterval(timer);
  const activeItem = history.list.find(
    (item) => active.pictureId === item.pictureId
  );

  timer = setInterval(() => {
    sideFn(activeItem);
  }, 20000); //20秒查询一次

  sideFn(activeItem);
};

// 停止轮询详情
const stopTimer = () => {
  clearInterval(timer);
};

// 获取详情
const getDetail = async (activeItem) => {
  return new Promise(async (resolve) => {
    try {
      const res = await request.get(api.picture_pictureDetail, {
        pictureId: activeItem.pictureId,
      });
      if (res.code !== 200) {
        resolve(null);
        return ElMessage({
          message: res.msg,
          type: "error",
        });
      }

      emit("post-detail", res.data);
      resolve(res.data);
    } catch (error) {
      resolve(null);
      ElMessage({
        message: error.message,
        type: "error",
      });
      throw error;
    }
  });
};

// 获取剩余绘画次数
const getResidueQuantity = () => {
  return new Promise(async (resolve) => {
    try {
      const res = await request.get(api.picture_residueQuantity, {});
      if (res.code !== 200) {
        resolve(false);
        return ElMessage({
          type: "error",
          message: res.msg,
        });
      }
      userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);
      resolve(true);
    } catch (error) {
      resolve(false);
      throw error;
    }
  });
};

// 侦听active变化  reactive类型数据newVal=oldVal, 解决方法为改为监听reactive数据里的某一属性
watch(
  () => props.active,
  (newVal, oldVal) => {
    console.log("newVal, oldVal", newVal, oldVal);
    if (newVal.pictureId) {
      if (newVal.pictureId !== oldVal.pictureId) {
        console.log("watch openTimer");
        openTimer(newVal);
        getResidueQuantity();
      }
    } else {
      stopTimer();
    }
  },
  { deep: false }
);

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
  console.log("getHistory");
  return new Promise(async (resolve) => {
    history.loading = true;
    const res = await request.get(api.picture_pictureList, {
      lastId: history.lastId,
      pageSize: history.pageSize,
    });

    if (res.code !== 200) {
      resolve(-1);
      return ElMessage({
        type: "error",
        message: res.msg,
      });
    } else {
      if (res.data.list && res.data.list.length) {
        res.data.list.forEach((item) => {
          item.createdAt = timeFormat(item.createdAt);
        });
        history.list = [...history.list, ...res.data.list];
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
      resolve(1);
    }
    history.loading = false;
  });
};

// 卷轴滚动事件
const onScroll = async (e) => {
  if (
    e.target.scrollTop + client.value.offsetHeight + 10 >
    page.value.offsetHeight
  ) {
    console.log("触底");
    if (history.loading) return;
    if (history.finish) return;
    const nextStatus = await getHistory();
  }
};

// 向列表顶端新增一个项
const handPutItem = (item) => {
  item.createdAt = timeFormat(item.createdAt);
  history.list = [item, ...history.list];
  history.empty = false;
};

// 删除当前选中的
const handRemoveItem = () => {
  return new Promise((resolve) => {
    request
      .post(api.picture_delPicture, { pictureId: props.active.pictureId })
      .then((res) => {
        if (res.code !== 200) {
          resolve(false);
          return ElMessage({
            message: res.msg,
            type: "error",
          });
        }
        // 先查找 后删除
        const idx = history.list.findIndex(
          (item) => item.pictureId == props.active.pictureId
        );
        history.list.splice(idx, 1);
        if (history.list.length === 0) {
          history.empty = true;
        }
        resolve(true);
      });
  });
};

// 重新开始获取当前选中的图片
const handUpdateItem = (active) => {
  openTimer(active);
};

onMounted(() => {
  getHistory();
});

onUnmounted(() => {
  stopTimer();
});

// 暴露
defineExpose({
  handRemoveItem,
  handPutItem,
  handUpdateItem,
});
</script>

<template>
  <div class="data-tab">
    <div class="title">历史绘画</div>
    <div class="views">
      <div class="empty" v-if="history.empty">
        <div class="text">暂无记录</div>
      </div>
      <div class="scroll_client" v-else ref="client" @scroll="onScroll">
        <div class="scroll_page" ref="page">
          <div
            :class="[
              'history_item',
              active.pictureId === item.pictureId ? 'history_item-active' : '',
            ]"
            v-for="(item, index) in history.list"
            :key="index"
            @click="handActive(item)"
          >
            <template v-if="item.isFail">
              <div class="fail-img">
                <img
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/draw-fail-status.png"
                  alt=""
                />
              </div>
            </template>
            <template v-else>
              <el-image
                v-if="item.pictureUrl"
                style="width: 100%; height: 100%"
                :src="item.pictureUrl"
                fit="cover"
              ></el-image>
              <div class="making-img" v-else>
                <img
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/drawing-status.png"
                  alt=""
                />
              </div>
            </template>
            <div class="mask">
              <div class="text">{{ item.createdAt }}</div>
            </div>
          </div>
          <div v-if="history.loading" class="reloading">加载中</div>
          <!-- <div v-if="history.finish" class="reloading">没有更多了</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.data-tab {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 39px;
    border-bottom: 1px solid #e6e6e6;
    text-align: left;
    text-indent: 20px;
    color: #414141;
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .views {
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #999;
      text-align: center;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;
      .text {
        transform: translate(0, -100px);
      }
    }

    .scroll_client {
      margin-right: 6px;
      height: 100%;
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

      .scroll_page {
        padding-left: 20px;
        .history_item {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 9.66px 0;
          border-radius: 5px;
          background-color: #f1f2f6;
          .el-image {
            border-radius: 5px;
          }

          .fail-img {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            img {
              width: 25px;
              height: 23.9px;
            }
          }

          .making-img {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            img {
              width: 70px;
              height: 70px;
            }
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-radius: 5px;

            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 73.96%,
              #000000 100%
            );
            cursor: pointer;
            .text {
              position: absolute;
              bottom: 4.41px;
              right: 6.3px;
              width: 160px;
              font-family: PingFang SC;
              font-size: 12px;
              transform-origin: right center;
              transform: scale(0.83);
              font-weight: 400;
              line-height: 16.87px;
              text-align: right;
              color: #ffffff;
              user-select: none;
            }
          }
        }
        .history_item-active {
          background-color: #f1f2f6;
          .mask {
            border: 3px solid rgba(18, 108, 254, 1);
          }
        }

        .reloading {
          color: #999;
          text-align: center;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-align: center;
        }
      }
    }
  }
}
</style>