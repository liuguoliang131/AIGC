<template>
  <div class="top_title_bar">
    <div class="float">
      <div class="logo" @click="goHome">
        <img src="@/assets/logo.png" class="img" />
        <span class="name"> Hanhou·AI </span>
      </div>
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
  </div>
</template>

<script setup>
import { showDialog, showToast } from "vant";
import { useRouter } from "vue-router";
import request from "@/http/index";
import api from "@/http/api";
import { useUserStore } from "@/store/user";
const userStore = useUserStore(); // 用户信息

const router = useRouter();

// 去首页
const goHome = () => {
  router.push({
    path: "/",
  });
};

// 确认退出登录
const confirmExit = () => {
  request.get(api.user_logout, {}).then((res) => {
    if (res.code == 200) {
      userStore.clearLog();
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
  showDialog({
    title: "退出提醒",
    message: "是否要退出登录",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "确定",
    confirmButtonColor: "#126cfe",
    cancelButtonText: "取消",
    cancelButtonColor: "#3D3D3D",
  })
    .then(() => {
      confirmExit();
    })
    .catch(() => {});
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
      display: flex;
      align-items: center;
      .img {
        width: 35px;
        height: 35px;
      }
      .name {
        margin-left: 5px;
        font-family: PingFang SC;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0em;
        text-align: left;
      }
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