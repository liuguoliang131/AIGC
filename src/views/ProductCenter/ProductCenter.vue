<template>
  <div class="container">
    <TopTitleBar />
    <div class="item-box">
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai-chat-card.png"
        class="item-image"
        @click="navToItem(1)"
      />
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai-draw-card.png"
        class="item-image size-box"
        @click="navToItem(2)"
      />
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
import TopTitleBar from "@/components/TopTitleBar.vue";

export default {
  components: {
    TopTitleBar,
  },
  data() {
    return {};
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
          path: "/chat",
        });
      } else if (value == 2) {
        this.$router.push({
          path: "/draw",
        });
      }
    },
    handGoICP() {
      window.open(`https://beian.miit.gov.cn/`);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #fff;
  background-image: url("https://quanres.hanhoukeji.com/hanhou-ai-pc/index-background1.png");
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
      color: #126cfe;
      border-color: #126cfe;
      font-size: 20px;
      width: 120px;
      height: 42px;
    }

    .login.el-button:hover {
      background-color: #126cfe19;
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
  height: 570px;
  cursor: pointer;
}

.size-box {
  margin-left: 172px;
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
  bottom: 32px;
  width: 100%;
}

.footer-record {
  margin-top: 4px;
  cursor: pointer;
}
</style>