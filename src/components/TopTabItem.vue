<template>
  <div class="banner" :style="{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }">
    <div class="banner_left">
      <img src="@/assets/logo.png" class="logo" @click="goHome" />
      <span class="banner_text" @click="goProduction">{{ productTitle }} </span>
      <span class="banner_text" @click="goStudy">{{ studyTitle }}</span>
    </div>
    <div class="banner_right">
      <!-- <el-button type="primary" plain v-if="!isLogged()" @click="goLogin" class="login">登录/注册</el-button>
      <div v-else>
        <span style="font-size: 15px;color: #1E1E1E; margin-right: 20px;">{{ userInfo().tel }}</span>
        <el-button type="primary" class="logout" @click="handExit">退出登录</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import utils from "@/common/utils";
import request from "@/http/index";
// import api from "./api";
import { ElButton, ElDialog, ElScrollbar } from "element-plus";
export default {
  name: "TopTabItem",
  props: {
    productTitle: {
      type: String,
      default: "产品",
      request: true,
    },

    studyTitle: {
      type: String,
      default: "学习中心",
      request: true,

    }
  },
  data() {
    return {

    }
  },
  methods: {
    goHome() {
      this.$emit("goHome")
    },
    goProduction() {
      this.$emit("goProduction")

    },
    goStudy() {
      this.$emit("goStudy")
    },
  },

}
</script>

<style>
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
</style>