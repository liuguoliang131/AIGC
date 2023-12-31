<template>
  <div
    class="banner"
    :style="{
      backgroundColor: `rgba(255, 255, 255, ${useRouterConfig.titleBarOpacity})`,
      display: useRouterConfig.titleBar ? 'flex' : 'none',
    }"
  >
    <div class="banner_left">
      <div class="logoWrapper" @click="goHome">
        <img
          v-show="isBlackMode"
          class="logo"
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/pc-black-hhai-logo.png"
          alt=""
        />
        <img
          v-show="!isBlackMode"
          class="logo"
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/pc-color-hhai-logo.png"
          alt=""
        />
      </div>
      <span
        :class="[
          'banner_text',
          isBlackMode ? 'black_text' : '',
          useRouterConfig.currentPath == '/product_center'
            ? 'banner_text_selected'
            : '',
        ]"
        @click="goProduct"
        >AI工具</span
      >
      <div class="learn_center_wrapper">
        <span
          :class="[
            'banner_text',
            isBlackMode ? 'black_text' : '',
            useRouterConfig.currentPath.includes('/learn_center')
              ? 'banner_text_selected'
              : '',
          ]"
          @click="goLearnCenter"
          >学习中心</span
        >
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/icon_limit_free.png"
          class="label"
          @click="goHome"
        />
      </div>
    </div>
    <div class="banner_right">
      <el-button
        plain
        v-if="!userStore.userInfo"
        @click="goLogin"
        :class="['login', isBlackMode ? 'loginBlack' : '']"
      >
        登录/注册
      </el-button>
      <div class="logged" v-else>
        <span :class="['loggedText', isBlackMode ? 'black_text' : '']">
          {{ userStore.userInfo.tel }}
        </span>
        <el-button
          :class="['logout', isBlackMode ? 'loginBlack' : '']"
          @click="handExit"
          >退出登录</el-button
        >
      </div>
    </div>

    <!-- 退出提醒 -->
    <el-dialog
      align-center
      v-model="exitVisible"
      width="3.1777rem"
      :show-close="false"
      :close-on-click-modal="false"
      @close="dialogClose"
    >
      <div class="dia_title">退出提醒</div>
      <div class="dia_content">是否要退出登录</div>
      <div class="dia_footer_2">
        <div class="cancel" @click="exitVisible = false">取消</div>
        <div class="confirm" @click="confirmExit">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import utils from "@/common/utils";
import api from "@/http/api";
import request from "@/http/index";
import { useRouterConfigStore } from "@/store/routerConfigStore";

import { ElButton, ElDialog, ElMessage } from "element-plus";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useChatStore } from "@/store/chat";
import { useDrawStore } from "@/store/draw";
const router = useRouter();
const useRouterConfig = useRouterConfigStore();

const userStore = useUserStore(); // 用户信息
const chatStore = useChatStore();
const drawStore = useDrawStore();

const isBlackMode = computed(() => {
  return (
    useRouterConfig.titleBarOpacity > 0.65 || useRouterConfig.currentPath != "/"
  );
});

function goHome() {
  router.push({
    path: "/",
  });
}

function goProduct() {
  router.push({
    path: "/product_center",
    replace: true,
  });
}

function goLearnCenter() {
  router.push({
    path: "/learn_center",
  });
}

// 去往登录页 记录当前路由
function goLogin() {
  userStore.goLoginPage();
}

// 弹层关闭事件
const dialogClose = () => {};

// 退出登录弹窗
const exitVisible = ref(false);

const handExit = () => {
  exitVisible.value = true;
};

// 确认退出登录
const confirmExit = () => {
  exitVisible.value = false;
  request.get(api.user_logout, {}).then((res) => {
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
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;

  .banner_left {
    display: flex;
    margin-left: 22px;
    align-items: center;
    justify-content: center;
    align-items: center;

    .logoWrapper {
      cursor: pointer;
      margin-right: 107px;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .logo {
        width: auto;
        height: 40px;
      }
    }

    .learn_center_wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .label {
      width: 80px;
      height: 32px;
      margin-bottom: 12px;
    }

    .banner_text {
      position: relative;
      color: white;
      font-size: 22px;
      font-weight: normal;
      line-height: 39px;
      cursor: pointer;

      &:nth-child(2) {
        margin-right: 40px;
      }

      &::after {
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        content: "";
        width: 25px;
        height: 4px;
        background-color: #1e1e1e;
        opacity: 0;
      }
    }

    .black_text {
      color: #1e1e1e;
    }

    .banner_text_selected {
      font-weight: 600;

      &::after {
        opacity: 1;
      }
    }
  }

  .banner_right {
    margin-right: 52px;

    .login.el-button {
      background-color: transparent;
      color: white;
      border-color: white;
      width: 120px;
      height: 42px;
      font-family: PingFang SC;
      font-size: 20px;
      font-weight: 400;
    }

    .login.el-button:hover {
      background-color: #126cfe19;
    }

    .logout.el-button {
      width: 120px;
      height: 42px;
      background-color: transparent;
      color: white;
      border-color: white;
      font-family: PingFang SC;
      font-size: 20px;
      font-weight: 400;
    }

    .loginBlack.el-button {
      color: #fff;
      border-color: #5495ff;
      background-color: #5495ff;

      &:hover {
        background-color: #5495ff;
      }
    }

    .logged {
      display: flex;
      align-items: center;

      .loggedText {
        font-size: 20px;
        color: #fff;
        margin-right: 20px;
      }

      .black_text {
        color: #1e1e1e;
      }
    }
  }
}

/deep/.el-dialog {
  border-radius: 16px;
}

/deep/.el-dialog__header {
  height: 0;
}

/deep/.service_dia {
  .el-dialog__headerbtn {
    width: 60px;
    height: 60px;
  }

  .el-dialog__close {
    font-size: 30.5px;
  }
}

/deep/.el-dialog__body {
  padding: 60px 73px;
}

.dia_title {
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
}

.dia_content {
  margin-top: 40px;
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.dia_footer_1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 58px;

  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 464px;
    height: 52px;
    border-radius: 6px;
    background: #126cfe;
    color: #fff;
    text-align: center;
    font-family: PingFang SC;
    font-size: 19px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
}

.dia_footer_2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 58px;

  .cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 52px;
    border-radius: 6px;
    background: #126cfe;
    color: #fff;
    text-align: center;
    font-family: PingFang SC;
    font-size: 19px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }

  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 220px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1px solid #126cfe;
    background-color: #fff;
    color: #126cfe;
    text-align: center;
    font-family: PingFang SC;
    font-size: 19px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
}

.service {
  display: flex;
  flex-direction: column;
  align-items: center;

  .service_title {
    margin-top: 30px;
    color: #000;
    font-family: PingFang SC;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .service_code {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 48px;
    margin-bottom: 40px;
    width: 320px;
    height: 320px;

    img {
      width: 270px;
      height: 270px;
    }
  }
}

.clipboard_text {
  position: fixed;
  top: -500px;
  left: 0;
  width: 200px;
  height: 200px;
}

@keyframes rotateLoading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/deep/.rotate_icon {
  transform-origin: center center;
  animation: rotateLoading 1.5s linear infinite;
}
</style>