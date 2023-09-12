<template>
  <div :class="[
    'slide_bar',
    props.visible ? 'slide_bar-visible' : 'slide_bar-hidden',
  ]">
    <div class="firstRow">
      <span class="leftCount">
        {{ from ? `剩余问答次数：${userStore.residueQAQuantity}次` : `剩余绘画次数：${userStore.residuePictureQuantity}次` }}
      </span>
      <img @click="handHide" src="@/assets/icon_close_page.png" class="close" />
    </div>
    <div class="topEntry">
      <div class="imgLeft">
        <img @click="handCreat" :src="from ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_new_chat.png'
          : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_new_chat.png'
          " class="imgLeftTop" />
        <img @click="handGoAiHistory" :src="from ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_my_chat.png'
          : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_my_chat.png'
          " class="imgLeftBottom" />
      </div>
      <img @click="handGoAiIndex" :src="from ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_enter_draw.png'
        : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_enter_draw.png'
        " class="imgRightCenter" />
    </div>
    <img @click="handGoLearnInfo" :src="from ? 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_course.png'
      : 'https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_course.png'
      " class="imgCourse" />

    <div class="footerWrapper">
      <div class="footerTitle">更多服务</div>
      <div @click="handGoLearnIndex" class="footerItemWrapper">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_learn_center.png"
          style="width: 14px; height: 16.64px;" />
        <span class="footer_item_title">学习中心</span>
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_sidebar_more.png"
          style="width: 12px; height: 12px;" />
      </div>
      <div class="divider"></div>
      <div @click="serviceVisible = true" class="footerItemWrapper">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_contacts.png"
          style="width: 14px; height: 16.64px;" />
        <span class="footer_item_title">联系客服</span>
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_sidebar_more.png"
          style="width: 12px; height: 12px;" />
      </div>

      <div class="divider"></div>
      <div @click="handExit" class="footerItemWrapper">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_exit.png" style="width: 14px; height: 16.64px;" />
        <span class="footer_item_title">退出登录</span>
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_sidebar_more.png"
          style="width: 12px; height: 12px;" />
      </div>
    </div>
    <van-overlay :show="serviceVisible" @click="serviceVisible = false">
      <div class="service">
        <div class="serviceWrapper">
          <div class="service_title">扫描二维码添加专属客服</div>
          <div class="service_code">
            <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/CustomerServiceCode.png" alt="" />
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup>
import { ElRow, ElCol } from "element-plus";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showDialog, showToast, Overlay as VanOverlay } from "vant";
import request from "@/http/index";
import api from "@/http/api";
import { useUserStore } from "@/store/user";
import MyDialog from "@/components/MyDialog.vue";
const userStore = useUserStore(); // 用户信息

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

// 隐藏当前组件
const handHide = () => {
  emit("update:visible", false);
};

// 新建
const handCreat = () => {
  if (from) {
    // 操作pinia store
  } else {
    // 操作pinia store
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
    .catch(() => { });
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
  height: 100%;
  box-sizing: border-box;
  background: #222E50;
  transition: left 0.5s;
  padding: 14px 16px;

  .firstRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;

    .leftCount {
      color: white;
      font-size: 14px;
    }

    .close {
      width: 22px;
      height: 22px;
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
    margin-bottom: 11px;
  }

  .footerWrapper {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 16px 16px 0 16px;
    display: flex;
    flex-direction: column;

    .divider {
      height: 0.3px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .footerTitle {
      color: white;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .footerItemWrapper {
      display: flex;
      padding: 12px 0;
      flex-direction: row;
      align-items: center;

      .footer_item_title {
        margin-left: 10px;
        font-size: 14px;
        flex: 1;
        color: rgba(255, 255, 255, 0.7);
      }
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