<template>
  <div class="container">
    <div class="navbar">
      <div class="call_left" @click="slideVisible = true">左侧菜单</div>
      <div class="center" @click="visible = true">AI对话</div>
      <div class="go_home" @click="handGoHome">回到首页</div>
    </div>
    <div class="container-body" @scroll="onScroll">
      <div class="chat-list">
        <div class=""></div>
      </div>
      <div class="new_question">
        <input type="text" v-model="newQuestion" />
        <button @click="onSend">发送</button>
      </div>
    </div>

    <transition>
      <slide-bar v-model:visible="slideVisible"></slide-bar>
    </transition>
    <my-dialog
      v-model:show="visible"
      title="温馨提示"
      message="是否要删除此对话消息？"
      showCancelButton
    >
    </my-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SlideBar from "@/components/mobile/SlideBar.vue";
import MyDialog from "@/components/mobile/MyDialog.vue";

const router = useRouter();

const visible = ref(false);
const slideVisible = ref(false); // 菜单页是否显示
const newQuestion = ref(""); // 新的提问内容

// 去首页
const handGoHome = () => {
  router.push({
    path: "/",
  });
};
const onScroll = (e) => {
  console.log(e);
};
const onSend = () => {
  if (!newQuestion.value) return;
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding-top: 44px;
  overflow: hidden;

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    .call_left {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
    .go_home {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  .container-body {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .chat-list {
    }
    .new_question {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>