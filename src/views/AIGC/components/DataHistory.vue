<template>
  <div class="data-tab">
    <div class="title">历史绘画</div>
    <div class="views">
      <!-- <div class="empty">
        <div class="text">暂无记录</div>
      </div> -->
      <div class="scroll_client" ref="client" @scroll="onScroll">
        <div class="scroll_page" ref="page">
          <div
            :class="[
              'history_item',
              history.activeItem.pictureId === item.pictureId
                ? 'history_item-active'
                : '',
            ]"
            v-for="(item, index) in history.list"
            :key="index"
            @click="handActive(item)"
          >
            <el-image
              style="width: 100%; height: 100%"
              :src="item.pictureUrl"
              fit="fill"
            ></el-image>
            <div class="mask">
              <div class="text">{{ item.createdAt }}</div>
            </div>
          </div>
          <div v-if="history.loading" class="reloading">加载中</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElDialog, ElMessage, ElImage } from "element-plus";
import { ref, reactive, watch, nextTick, onMounted } from "vue";
import request from "@/http/index";
import api from "../api";

const { showClose, closeOnClickModal, visible } = defineProps({
  showClose: {
    default: false,
    type: Boolean,
    description: "是否显示关闭按钮",
  },
  closeOnClickModal: {
    default: false,
    type: Boolean,
    description: "点击遮罩层是否关闭弹窗",
  },
  visible: {
    default: false,
    type: Boolean,
    description: "打开/关闭",
  },
});
console.log("props", showClose, closeOnClickModal, visible);

const emit = defineEmits(["close"]);

const client = ref(); // 卷轴dom
const page = ref(); // 卷轴内容dom

const history = reactive({
  lastId: 0,
  pageSize: 20,
  loading: false,
  finish: false,
  empty: false,
  list: [],
  activeItem: {},
});

// 选择图片
const handActive = (item) => {
  history.activeItem = item;
};

// 获取图片列表
const getHistory = async () => {
  console.log("getHistory");
  return new Promise(async (resolve) => {
    history.loading = true;
    // const res = await request.get(api.picture_pictureList, {
    //   lastId: history.lastId,
    //   pageSize: history.pageSize,
    // });
    const res = await mock();
    if (res.code !== 200) {
      resolve(-1);
      return ElMessage({
        type: "error",
        message: res.msg,
      });
    } else {
      if (res.data.list && res.data.list.length) {
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

const mock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        msg: "哈哈哈",
        data: {
          list: [
            {
              pictureId: history.list.length + 1,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 2,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 3,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 4,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 5,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 6,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 7,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 8,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 9,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 10,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 11,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 12,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 12,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 14,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 15,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 16,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 17,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 18,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 19,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
            {
              pictureId: history.list.length + 20,
              pictureUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              createdAt: "2023-07-28 10:55",
              isFail: false,
            },
          ],
        },
      });
    }, 2000);
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

onMounted(() => {
  getHistory();
});
</script>

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
          .el-image {
            border-radius: 5px;
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
          .mask {
            border: 2px solid rgba(104, 162, 255, 1);
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