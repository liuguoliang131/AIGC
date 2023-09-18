<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="empty" v-if="tagList.isNull">
      <div class="empty-center">暂无历史记录</div>
    </div>
    <div class="container-body" v-else ref="tagListScroll" @scroll="onScroll">
      <div class="page" ref="tagListPage">
        <div
          class="item"
          v-for="item in tagList.list"
          :key="item.id"
          @click="handGoChat(item)"
        >
          <div class="title nowrap">{{ item.title }}</div>
          <img
            class="del"
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-deltag-icon.svg"
            alt=""
            @click.stop="handDeleteTag(item)"
          />
        </div>
        <div class="listloading" v-show="tagList.loading">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-listloading-white-icon.png"
            alt=""
          />
          <span>加载中</span>
        </div>
      </div>
    </div>
    <div class="newchat" @click="handNewChat">
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
      <span>新建AI对话</span>
    </div>

    <my-dialog
      v-model:show="removeVisible"
      title="温馨提示"
      message="是否要删除此对话窗口？"
      showCancelButton
      @confirm="confirmRemove"
    >
    </my-dialog>
  </div>
</template>

<script setup>
import NavBar from "@/components/mobile/NavBar.vue";
import { showToast, closeToast } from "vant";
import { ref, reactive, watch, onUpdated, nextTick } from "vue";
import api from "@/http/api";
import request from "@/http/index";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useChatStore } from "@/store/chat";
import MyDialog from "@/components/mobile/MyDialog.vue";

const router = useRouter();
const chatStore = useChatStore();
const userStore = useUserStore();
const tagList = reactive({
  list: [],
  loading: false, // 左侧历史列表的loading
  finish: false, // 加载完成
  isNull: false, // 左侧聊天历史列表是否为空
});
// tagList滚动卷轴ref
const tagListScroll = ref();
// tagList内容盒子
const tagListPage = ref();
// 删除对话窗口弹窗
const removeVisible = ref(false);
// 即将要删除项的id
const tagId = ref(null);

// 删除弹窗打开
const handDeleteTag = (item) => {
  tagId.value = item.id;
  removeVisible.value = true;
};

// 确认删除
const confirmRemove = () => {
  showToast({
    duration: 0,
    forbidClick: true,
    type: "loading",
    message: "加载中",
  });
  request
    .post(api.ai_delTag, {
      tagId: tagId.value,
    })
    .then((res) => {
      closeToast();
      if (res.code === 200) {
        const idx = tagList.list.findIndex((item) => item.id == tagId.value);
        tagList.list.splice(idx, 1);
        tagList.lastId = tagList.list.length
          ? tagList.list[tagList.list.length - 1].id
          : 0;
        // 聊天页展示的时当前的id时  清空一下储存的id
        if (chatStore.activeTagId === tagId.value) {
          chatStore.saveActiveTagId(0);
        }

        showToast("删除成功");
      } else {
        showToast(res.msg || res.message);
      }
    });
};

// 监听滚动
const onScroll = (e) => {
  if (
    e.target.scrollTop + tagListScroll.value.offsetHeight ===
    tagListPage.value.offsetHeight
  ) {
    getHistory();
  }
};

// 获取聊天历史列表 和 剩余提问次数
const getHistory = () => {
  if (tagList.loading) return;
  if (tagList.finish) return;
  tagList.loading = true;
  const pageSize = 10;
  const lastId = tagList.list.length
    ? tagList.list[tagList.list.length - 1].id
    : 0;
  request
    .get(api.chat_tagList, {
      lastId,
      pageSize,
    })
    .then((res) => {
      if (res.code == 200) {
        if (
          lastId === 0 &&
          res.data &&
          res.data.list &&
          res.data.list.length === 0
        ) {
          tagList.isNull = true;
        }

        const list = res.data.list;

        tagList.list = [...tagList.list, ...list];

        // 条数不足 没有下一页了
        if (res.data.list.length < pageSize) {
          tagList.finish = true;
        }
      } else {
        tagList.finish = true;
        showToast(res.message || res.msg);
      }
      tagList.loading = false;
    });
};

// 对话列表不满一屏 加载
getHistory();
onUpdated(() => {
  const page = document.querySelector(".page");
  const style = window.getComputedStyle(page, null);
  const bottom = parseFloat(style.getPropertyValue("padding-bottom"));

  if (
    tagListPage.value.offsetHeight - bottom <=
    tagListScroll.value.offsetHeight
  ) {
    console.log("对话列表不满一屏,加载");
    getHistory();
  }
});

// 去聊天页
const handGoChat = (item) => {
  chatStore.saveActiveTagId(item.id);
  router.push({
    path: "/chat",
  });
};

// 新增聊天
const handNewChat = () => {
  if (userStore.residueQAQuantity == 0) {
    return showToast("您的问答次数已用尽，请联系客服购买");
  }

  chatStore.saveActiveTagId(0);
  router.push({
    path: "/chat",
  });
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
  box-sizing: border-box;
  background-color: #222e51;
  .container-body {
    height: calc(100% - 123px);
    overflow-y: scroll;
    .page {
      color: #ffffff;
      padding: 20px;
      .listloading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 12px;
        padding-bottom: 12px;
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
          color: rgba(255, 255, 255, 0.9);
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      }
      .item {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 335px;
        height: 40px;
        padding: 0 12px;
        margin-bottom: 12px;
        border-radius: 5px;
        border: 1px solid #5aa1f8;
        background: rgba(0, 0, 0, 0.3);
        .title {
          flex: 1;
          padding-right: 25px;
          color: #c9e1ff;
          font-family: PingFang SC;
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .del {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translate(0, -50%);
          width: 16px;
          height: 16px;
          &:active {
            opacity: 0.7;
          }
        }
      }
      .item:nth-last-child(1) {
        margin-bottom: 0;
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
      color: rgba(255, 255, 255, 0.4);
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      text-align: center;
      transform: translate(0, -200%);
    }
  }

  .newchat {
    position: fixed;
    bottom: 39px;
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