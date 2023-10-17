
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElDialog } from "element-plus";
import request from "@/http/index";
import api from "@/http/api";
import utils from "@/common/utils";
import { useUserStore } from "@/store/user";

const emit = defineEmits(["onPannelToggle"]);
const userStore = useUserStore(); //用户信息

const router = useRouter();
const route = useRoute();

// 退出登录弹窗
const exitVisible = ref(false);
const isExpandMode = ref(true);

// 客服二维码弹窗
const serviceVisible = ref(false);

// 弹层关闭事件
const dialogClose = () => { };

// 确认退出登录
const confirmExit = () => {
  exitVisible.value = false;
  request.get(api.user_logout, {}).then((res) => {
    if (res.code == 200) {
      userStore.clearLog();
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

// 去往ai对话
const handGoChat = () => {
  router.push({
    path: "/chat",
  });
};

// 去往ai绘画
const handGoDraw = () => {
  router.push({
    path: "/draw",
  });
};

// 去往学习中心
const handGoLearn = () => {
  router.push({
    path: "/learn_center",
  });
};

// 去首页
const handGoHome = () => {
  router.push({
    path: "/",
  });
};
function togglePannel() {
  isExpandMode.value = !isExpandMode.value;
  emit('on-pannel-toggle', isExpandMode.value);
}
</script>

<template>
  <div :class="['sidebar', isExpandMode ? '' : 'sidebarShrink']">
    <div class="title" @click="handGoHome">
      <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/hanhou-logo.png" alt="" />
      {{ isExpandMode ? '憨猴·AI' : '' }}
    </div>
    <div :class="['sidebar-slot', isExpandMode ? '' : 'sidebar-slotShrink']">
      <slot></slot>
    </div>
    <div :class="['sidebar-foo', isExpandMode ? '' : 'sidebar-fooShrink']">
      <div :class="['splitline', isExpandMode ? '' : 'splitlineShrink']"></div>
      <div v-if="route.path.includes('/draw')" :class="['menu-item', isExpandMode ? '' : 'menu-chatitemShrink']"
        @click="handGoChat">
        <img :src="isExpandMode ?
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/menu-chat.png' :
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/icon_chat.png'" alt="" />
      </div>
      <div v-else :class="['menu-item', isExpandMode ? '' : 'menu-chatitemShrink']" @click="handGoDraw">
        <img :src="isExpandMode ?
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/menu-draw.png' :
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/icon_draw.png'" alt="" />
      </div>
      <div :class="['menu-item', isExpandMode ? '' : 'menu-otheritemShrink']" @click="serviceVisible = true">
        <img :src="isExpandMode ?
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/menu-service.png' :
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/icon_contact.png'" alt="" />
      </div>
      <div :class="['menu-item', isExpandMode ? '' : 'menu-otheritemShrink']" @click="handGoLearn">
        <img :src="isExpandMode ?
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/menu-learn.png' :
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/icon_learn.png'" alt="" />
      </div>
      <div :class="['menu-item', isExpandMode ? '' : 'menu-otheritemShrink']" @click="exitVisible = true">
        <img :src="isExpandMode ?
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/menu-gologin.png' :
          'https://quanres.hanhoukeji.com/hanhou-ai-pc/icon_exit.png'" alt="" />
      </div>
    </div>

    <img :src="isExpandMode ?
      require('@/assets/shrink.svg') :
      require('@/assets/expanded.svg')" class="expandStyle"
      @click="togglePannel" />

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
    <!-- 客服二维码 -->
    <el-dialog align-center v-model="serviceVisible" width="3.1777rem" :show-close="true" :close-on-click-modal="false"
      @close="dialogClose" class="service_dia">
      <div class="service">
        <div class="service_title">扫描二维码添加专属客服</div>
        <div class="service_code">
          <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/CustomerServiceCode.png" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.sidebarShrink {
  width: 100px !important;
}

.sidebar {
  position: relative;
  width: 311px;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(34, 46, 81, 1);
  text-align: center;

  .expandStyle {
    top: 50%;
    width: 13px;
    height: 38px;
    right: 0;
    transform: translateY(-50%);
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 0 34px 0;
    font-family: PingFang SC;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    color: rgba(243, 243, 250, 1);
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      margin-right: 13px;
    }
  }

  .sidebar-fooShrink {
    height: 480px !important;
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
  }

  .sidebar-foo {
    box-sizing: border-box;
    width: 100%;
    height: 269px;

    .splitlineShrink {
      width: 100px !important;
      margin: 0 !important;
      height: 1px !important;
    }

    .splitline {
      width: 270px;
      height: 1px;
      margin: 0 auto 22px auto;
      background-color: #475272;
    }

    .menu-chatitemShrink {
      height: 49px !important;
      padding: 15px 0 15px 0 !important;

      img {
        width: 47px !important;
        height: 49px !important;
      }
    }

    .menu-otheritemShrink {
      height: 49px !important;
      padding: 15px 0 15px 0 !important;

      img {
        width: 64px !important;
        height: 49px !important;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 47px;
      margin: 10px 0;
      cursor: pointer;

      &:hover {
        background: rgba(23, 33, 65, 1);
      }

      img {
        width: 256px;
        height: 27px;
      }
    }
  }

  .sidebar-slotShrink {
    height: calc(100% - 530px) !important;
  }

  .sidebar-slot {
    height: calc(100% - 367px);

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #0a1432;

      border-radius: 10px;
      transition: all 0.2s ease-in-out;
      border-radius: 11px;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    ::-webkit-scrollbar-track-piece {
      background-color: rgba(34, 46, 81, 1);
      border-radius: 11px;
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
}
</style>