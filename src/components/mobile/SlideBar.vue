<template>
  <div
    :class="[
      'slide_bar',
      props.visible ? 'slide_bar-visible' : 'slide_bar-hidden',
    ]"
  >
    <button @click="handHide">右上角X</button>
    <button @click="handCreat">{{ from ? "新建对话" : "新建会话" }}</button>
    <button @click="handGoAiHistory">
      {{ from ? "历史对话" : "历史绘画" }}
    </button>
    <button @click="handGoAiIndex">
      {{ from ? "快速进入AI绘画" : "快速进入AI对话" }}
    </button>
    <button @click="handGoLearnInfo">
      {{
        from
          ? "AI对话课程上线了,赶快来看一看吧"
          : "AI绘画课程上线了,赶快来看一看吧"
      }}
    </button>
    <div>-----更多服务-------</div>
    <button @click="handGoLearnIndex">学习中心</button>
    <button @click="serviceVisible = true">联系客服</button>
    <button @click="handExit">退出登录</button>
    <van-overlay :show="serviceVisible" @click="serviceVisible = false">
      <div class="wrapper">
        <div class="block" @click.stop>二维码</div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showDialog, showToast, Overlay as VanOverlay } from "vant";
import request from "@/http/index";
import api from "@/http/api";
import { useUserStore } from "@/store/user";
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
    .catch(() => {});
};
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
  background: rgba(0, 0, 0, 0.5);
  transition: left 0.5s;
}
.slide_bar-visible {
  left: 0;
}
.slide_bar-hidden {
  left: -100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>