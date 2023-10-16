<template>
  <div
    :class="[
      'slide_bar',
      props.visible ? 'slide_bar-visible' : 'slide_bar-hidden',
    ]"
  >
    <div class="firstRow">
      <div class="leftCount">
        {{
          from
            ? `剩余问答次数：${userStore.residueQAQuantity}次`
            : `剩余绘画次数：${userStore.residuePictureQuantity}次`
        }}
      </div>
      <div class="f-right">
        <div class="buy_vip" @click="handGoByVip">购买会员</div>
        <img
          @click="handHide"
          src="@/assets/icon_close_page.png"
          class="close"
        />
      </div>
    </div>
    <div class="topEntry">
      <div class="imgLeft">
        <img
          @click="handCreat"
          :src="
            from
              ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_new_chat.png'
              : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_new_draw.png'
          "
          class="imgLeftTop"
        />
        <img
          @click="handGoAiHistory"
          :src="
            from
              ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_my_chat.png'
              : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_my_draw.png'
          "
          class="imgLeftBottom"
        />
      </div>
      <img
        @click="handGoAiIndex"
        :src="
          from
            ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_enter_draw.png'
            : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_enter_chat.png'
        "
        class="imgRightCenter"
      />
    </div>
    <img
      @click="handGoLearnInfo"
      :src="
        from
          ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_course.png'
          : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_course_draw.png'
      "
      class="imgCourse"
    />

    <div class="footerTitle">更多服务</div>
    <div class="footerWrapper">
      <div @click="handGoLearnIndex" class="footerItemWrapper">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_learn_center.png"
          class="footerItemIcon"
        />
        <span class="footer_item_title">学习中心</span>
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_sidebar_more.png"
          class="footerItemMore"
        />
      </div>
      <div class="divider"></div>
      <div @click="serviceVisible = true" class="footerItemWrapper">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_contacts.png"
          class="footerItemIcon"
        />
        <span class="footer_item_title">联系客服</span>
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_sidebar_more.png"
          class="footerItemMore"
        />
      </div>
    </div>
    <div @click="handExit" class="exit">
      <span class="exit_title">退出登录</span>
    </div>
    <van-overlay :show="serviceVisible" @click="serviceVisible = false">
      <div class="service">
        <div class="serviceWrapper">
          <div class="service_title">扫描二维码添加专属客服</div>
          <div class="service_code">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/CustomerServiceCode.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </van-overlay>

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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showToast, closeToast, Overlay as VanOverlay } from "vant";
import request from "@/http/index";
import api from "@/http/api";
import { useUserStore } from "@/store/user";
import MyDialog from "@/components/mobile/MyDialog.vue";
import { useChatStore } from "@/store/chat";
import { useDrawStore } from "@/store/draw";
import utils from "@/common/utils";
const userStore = useUserStore(); // 用户信息
const chatStore = useChatStore(); // ai对话
const drawStore = useDrawStore();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    description: "本组件是否显示",
  },
});

const emit = defineEmits(["update:visible"]);
const route = useRoute();
const router = useRouter();
const from = route.path.includes("/chat"); // true对话 false绘画
const serviceVisible = ref(false); // 显示客服二维码弹窗
const exitVisible = ref(false);

// 隐藏当前组件
const handHide = () => {
  emit("update:visible", false);
};

// 新建
const handCreat = () => {
  if (from) {
    // 操作pinia store
    chatStore.saveActiveTagId(0);
  } else {
    // 操作pinia store
    router.push({
      path: "/draw",
    });
  }
  // 隐藏本组件
  handHide();
};

// 去对话/绘画历史
const handGoAiHistory = () => {
  if (from) {
    router.push({
      path: "/chat/history",
    });
  } else {
    router.push({
      path: "/draw/history",
    });
  }
};

// 进入AI对话/绘画
const handGoAiIndex = () => {
  if (from) {
    router.push({
      path: "/draw",
    });
  } else {
    router.push({
      path: "/chat",
    });
  }
};

// 进入学习中心播放页
const handGoLearnInfo = () => {
  if (from) {
    router.push({
      path: "/learn_center/player",
      query: {
        group: 1,
      },
    });
  } else {
    router.push({
      path: "/learn_center/player",
      query: {
        group: 2,
      },
    });
  }
};

// 进入学习中心列表页
const handGoLearnIndex = () => {
  router.push({
    path: "/learn_center",
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

// 获取剩余绘画次数
const getResidueQuantity = () => {
  return new Promise(async (resolve) => {
    try {
      const res = await request.get(api.picture_residueQuantity, {});
      if (res.code !== 200) {
        resolve(false);
        return ElMessage({
          type: "error",
          message: res.msg,
        });
      }
      userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);
      resolve(true);
    } catch (error) {
      resolve(false);
      throw error;
    }
  });
};

// 购买会员
const handGoByVip = () => {
  router.push({
    path: "/buy_member",
  });
};

onMounted(() => {
  if (!from) {
    getResidueQuantity();
  }
});
</script>

<style scoped lang="less">
.slide_bar {
  position: fixed;
  left: -100%;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  background: #222e50;
  transition: left 0.5s;
  padding: 11px 16px 14px 16px;

  .firstRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 11px;

    .leftCount {
      color: white;
      font-size: 14px;
    }
    .f-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .buy_vip {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 12px;
        margin: 0 12px;
        border-radius: 23.5px;
        border: 1px solid #fae1c6;
        background: #3b3633;
        color: #fae1c6;
        text-align: center;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        &:active {
          opacity: 0.7;
        }
      }

      .close {
        width: 22px;
        height: 22px;
      }
    }
  }

  .topEntry {
    display: flex;
    flex-direction: row;
    margin-bottom: 7px;

    .imgLeft {
      display: flex;
      flex-direction: column;
      margin-right: 6px;

      .imgLeftTop {
        width: 165px;
        height: 54px;
        margin-bottom: 6px;
      }

      .imgLeftBottom {
        width: 165px;
        height: 54px;
      }
    }

    .imgRightCenter {
      width: 172px;
      height: 114px;
    }
  }

  .imgCourse {
    width: 343px;
    height: 114px;
    margin-bottom: 27px;
  }

  .footerTitle {
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 13px;
  }

  .footerWrapper {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 0px 16px 0 16px;
    display: flex;
    flex-direction: column;

    .divider {
      height: 0.3px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .footerItemWrapper {
      display: flex;
      padding: 15px 0;
      flex-direction: row;
      align-items: center;

      .footer_item_title {
        margin-left: 10px;
        font-size: 14px;
        flex: 1;
        color: rgba(255, 255, 255, 0.7);
      }

      .footerItemIcon {
        width: 14px;
        height: 16.64px;
      }

      .footerItemMore {
        width: 12px;
        height: 12px;
      }
    }
  }
  .exit {
    position: absolute;
    bottom: 38px;
    left: 0;
    width: calc(100% - 32px);
    margin: 0 16px;
    height: 43px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    .exit_title {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

.service {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .serviceWrapper {
    flex-direction: column;
    background-color: white;
    width: 280px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    display: flex;

    .service_title {
      margin-top: 30px;
      color: #000;
      font-family: PingFang SC;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .service_code {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      margin-bottom: 30px;
      width: 200px;
      height: 200px;

      img {
        width: 200px;
        height: 200px;
      }
    }
  }
}

.slide_bar-visible {
  left: 0;
}

.slide_bar-hidden {
  left: -100%;
}
</style>
