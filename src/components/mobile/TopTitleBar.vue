<template>
  <div class="top_title_bar">
    <div class="float">
      <img
        @click="goHome"
        class="logo"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-black-hhai-logo.png"
        alt=""
      />
      <template v-if="userStore.userInfo">
        <div class="rslot">
          <span class="tel">{{ userStore.userInfo.tel }}</span>
          <div class="btn" @click="handExit">退出登录</div>
        </div>
      </template>
      <template v-else>
        <div class="btn" @click="goLogin">登录/注册</div>
      </template>
    </div>
    <my-dialog
      v-model:show="exitVisible"
      title="退出提醒"
      message="是否要退出登录"
      showCancelButton
      @confirm="confirmExit"
    >
    </my-dialog>
  </div>
</template>

<script setup>
import { showToast, closeToast } from "vant";
import MyDialog from "@/components/mobile/MyDialog.vue";
import { useRouter } from "vue-router";
import request from "@/http/index";
import api from "@/http/api";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { useChatStore } from "@/store/chat";
import { useDrawStore } from "@/store/draw";
const userStore = useUserStore(); // 用户信息
const chatStore = useChatStore();
const drawStore = useDrawStore();
const router = useRouter();

const exitVisible = ref(false);

// 去首页
const goHome = () => {
  router.push({
    path: "/",
  });
};

// 确认退出登录
const confirmExit = () => {
  showToast({
    duration: 0,
    forbidClick: true,
    type: "loading",
    message: "加载中",
  });
  request.get(api.user_logout, {}).then((res) => {
    closeToast();
    if (res.code == 200) {
      userStore.clearLog();
      chatStore.saveActiveTagId(0);
      drawStore.clearHistoryItem();
      utils.clearAll();
      router.push({
        path: "/",
        replace: true,
      });
    } else {
      showToast(res.msg);
    }
  });
};

// 点击退出
const handExit = () => {
  exitVisible.value = true;
};

// 去往登录页 记录当前路由
const goLogin = () => {
  userStore.goLoginPage();
};
</script>

<style scoped lang="less">
.top_title_bar {
  height: 44px;
  .float {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100vw;
    height: 44px;
    padding: 0 16px;
    background: #fff;
    .logo {
      width: auto;
      height: 35px;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 82px;
      height: 26px;
      border-radius: 3px;
      border: 1px solid rgba(18, 108, 254, 1);
      color: #126cfe;
      text-align: center;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      &:active {
        opacity: 0.7;
      }
    }
    .rslot {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .tel {
        margin-right: 7px;
        color: #1e1e1e;
        text-align: center;
        font-family: PingFang SC;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .btn {
        width: 82px;
        height: 26px;
        flex-shrink: 0;
        border-radius: 3px;
        border: 1px solid #126cfe;
        background: #126cfe;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}
</style>