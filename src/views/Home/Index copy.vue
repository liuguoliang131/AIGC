<template>
  <div class="container">
    <el-scrollbar style="{font-size: 0;}" @scroll="onScroll">
      <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home1.png" class="itemImage" />
      <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home2.png" class="itemImage" />
      <div class="wrapperFooter">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3.png" class="itemImage" />
        <div class="footer">
          <div class="footer-record">
            <a @click="handGoICP">京ICP备19041918号-1京公网安备11010502039881号</a>
          </div>
          <div class="footer-record">
            <a @click="handGoICP">网络经营许可证京网文[2020]4683-870号</a>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="banner" :style="{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }">
      <div class="banner_left">
        <img src="@/assets/logo.png" class="logo" @click="goHome" />
        <span class="banner_text" @click="goProduct">产品</span>
        <span class="banner_text">学习中心</span>
      </div>
      <div class="banner_right">
        <el-button type="primary" plain v-if="!isLogged()" @click="goLogin" class="login">登录/注册</el-button>
        <div v-else>
          <span style="font-size: 15px;color: #1E1E1E; margin-right: 20px;">{{ userInfo().tel }}</span>
          <el-button type="primary" class="logout" @click="handExit">退出登录</el-button>
        </div>
      </div>
    </div>
    <!-- 顶部切换 -->
    <!-- <TopTabItem productTitle="产品" studyTitle="学习中心" @active="goHome"></TopTabItem> -->
    <!-- 退出提醒 -->
    <el-dialog align-center v-model="exitVisible" width="3.1777rem" :show-close="false" :close-on-click-modal="false"
      @close="dialogClose">
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
import request from "@/http/index";
import api from "./api";
import TopTabItem from "../../components/TopTabItem.vue";
import { ElButton, ElDialog, ElScrollbar, ElMessage } from "element-plus";
import {
  ref
} from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const opacity = ref(0);
function userInfo() {
  return utils.getUserInfo();
}

function isLogged() {
  let info = utils.getUserInfo();
  return !!info;
}

function onScroll(event) {
  let { scrollTop } = event;
  if (scrollTop <= 0) {
    scrollTop = 0;
  } else if (scrollTop > 70) {
    scrollTop = 70;
  }
  opacity.value = scrollTop / 70;
}

function goHome() {
  router.push({
    path: "/",
  });
};

function goProduct() {
  router.push({
    path: "/product_center"
  })
};

function goLogin() {
  router.push({
    path: "/login",
  });
};
// 弹层关闭事件
const dialogClose = () => { };


// 退出登录弹窗
const exitVisible = ref(false);

const handExit = () => {
  exitVisible.value = true;
};

// 确认退出登录
const confirmExit = () => {
  exitVisible.value = false;
  request.get(api.user_logout, {})
    .then((res) => {
      if (res.code == 200) {
        utils.setToken("");
        utils.setUserInfo("");
        router.push({
          path: "/",
          replace: true,
          force: true,
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

<style scoped lang="less">
.container {
  height: 100%;
  display: flex;

  .banner {
    width: 100%;
    height: 70px;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .banner_left {
      display: flex;
      margin-left: 22px;
      align-items: center;
      justify-content: center;
      align-items: center;

      .logo {
        width: 197px;
        height: 40px;
        margin-right: 107px;
        cursor: pointer;
      }

      .banner_text {
        color: black;
        font-size: 28px;
        margin-right: 40px;
        font-weight: normal;
        cursor: pointer;
      }
    }

    .banner_right {
      margin-right: 52px;

      .login.el-button {
        background-color: transparent;
        color: #126CFE;
        border-color: #126CFE;
        font-size: 20px;
        width: 120px;
        height: 42px;
      }

      .login.el-button:hover {
        background-color: #126CFE19;
      }

      .logout.el-button {
        font-size: 20px;
        width: 120px;
        height: 42px;
      }
    }
  }

  .itemImage {
    width: 100vw;
    height: auto;
    display: block;
    object-fit: fill;
  }

  //

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

  .wrapperFooter {
    position: relative;
  }

  .footer {
    color: #666666;
    text-align: center;
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: absolute;
    bottom: 76px;
    width: 100%;
  }

  .footer-record {
    margin-top: 4px;
    cursor: pointer;
  }
}
</style>