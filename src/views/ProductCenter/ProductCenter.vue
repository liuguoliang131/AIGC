<template>
  <div class="container">
    <!-- <div class="banner" :style="{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }">
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
    </div> -->
    <div class="item-box">
      <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai-chat-card.png" class="item-image" @click="navToItem(1)" />
      <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai-draw-card.png" class="item-image size-box"
        @click="navToItem(2)" />
    </div>
    <div class="footer">
      <div class="footer-record">
        <a @click="handGoICP">京ICP备19041918号-1京公网安备11010502039881号</a>
      </div>
      <div class="footer-record">
        <a @click="handGoICP">网络经营许可证京网文[2020]4683-870号</a>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/common/utils";
import { ElMessage } from "element-plus";

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
    },
    navToItem(value) {
      if (value == 1) {
        this.$router.push({
          path: "aigc/chat",
        });

      } else if (value == 2) {
        return ElMessage({
          message: "AI绘画功能正在开发中，敬请期待~",
          type: "warning",
        });
      }
    },

  },

}
</script>

<style>
.container {
  height: 100%;
  background-color: #fff;
  background-image: url('https://quanres.hanhoukeji.com/hanhou-ai-pc/index-background1.png');
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

.item-box {
  text-align: center;
  width: 100%;

}

.item-image {
  width: 431px;
  height: 570px
}

.size-box {
  margin-left: 172px;
}

.footer {
  color: #666;
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
  margin-top: 16px;
  cursor: pointer;
}
</style>