<template>
  <div class="container">
    <div class="banner" :style="{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }">
      <div class="banner_left">
        <img src="@/assets/logo.png" class="logo" @click="goHome" />
        <span class="banner_text">产品</span>
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

  </div>
</template>

<script>
import utils from "@/common/utils";

export default {
  data() {
    return {
    };
  },
  methods: {
    userInfo() {
      return utils.getUserInfo();
    },
    isLogged() {
      let info = utils.getUserInfo();
      return !!info;
    }
  },

}
</script>

<style>
.container {
  height: 100%;
  background-image: url("https://quanres.hanhoukeji.com/hanhou-ai-pc/login_bg2.png");
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

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
      width: 239px;
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
</style>