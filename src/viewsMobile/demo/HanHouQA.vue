<template>
  <div class="container">
    <div class="form">
      <van-dropdown-menu>
        <van-dropdown-item v-model="selectResult" :options="columns" />
      </van-dropdown-menu>

      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          maxlength="500"
          placeholder="请输入您的问题"
          show-word-limit
        />
      </van-cell-group>
      <div class="btnWrapper">
        <div class="reset" @click="reset">重置</div>
        <voice-input-button
        appId="57fe6cc5"
        apiKey="0bf1bd1b6e154aea50622ef5bf4257c6"
        apiSecret="MTI4MjVjNmQxMjBkYTZiZjI3N2U5MjBi"
        @record="showResult"
        @record-start="recordStart"
        @record-stop="recordStop"
        @record-blank="recordNoResult"
        @record-failed="recordFailed"
        @record-ready="recordReady"
        @record-complete="recordComplete"
        interactiveMode="press"
        tipPosition="top"
      >
        <template slot="no-speak">没听清您说的什么</template>
      </voice-input-button>
      <voice-output-button :message="result"></voice-output-button>
      <div class="submit" @click="answer">手动<br>提问</div>
      </div>
    </div>

    <div class="result" @click="copy">{{ result }}</div>
    <div
      ref="copy_text"
      class="clipboard_text"
      data-clipboard-action="copy"
      data-clipboard-text="copytext"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import request from "@/http/index";
import voiceInputButton from "./input/voice-input-button.vue";
import voiceOutputButton from "./tts/tts.vue";

import Clipboard from "clipboard";
import {
  CellGroup as VanCellGroup,
  DropdownItem as VanDropdownItem,
  DropdownMenu as VanDropdownMenu,
  Field as VanField,
  closeToast,
  showLoadingToast,
  showToast,
} from "vant";
const selectResult = ref("/qa/hanhou");
const message = ref("");
const columns = [
  { text: "憨猴", value: "/qa/hanhou" },
  { text: "流浪地球", value: "/qa/lldq" },
  { text: "中山", value: "/qa/zhongshan" },
];

const result = ref("");

function answer() {
  showLoadingToast({
    duration: 0,
    message: "处理中...",
    forbidClick: true,
  });
  const query = encodeURIComponent(message.value);
  request
    .get(`/user/hanhouqa?question=${selectResult.value}/${query}`)
    .then((res) => {
      closeToast();
      if (res.code == 200) {
        result.value = res.data;
      } else {
        showToast(res.msg || res.message);
      }
    })
    .catch(() => {
      closeToast();
    });
}
function recordReady() {
  console.info("按钮就绪!");
}
function recordStart() {
  console.info("录音开始");
  message.value = '';
}
function showResult(text) {
  message.value = text;
  console.info("收到识别结果：", text);
}
function recordStop() {
  console.info("录音结束");
}
function recordNoResult() {
  console.info("没有录到什么，请重试");
}
function recordComplete(text) {
  message.value = text;
  answer();
  console.info("识别完成! 最终结果：", text);
}
function recordFailed(error) {
  console.info("识别失败，错误栈：", error);
}

function reset() {
  message.value = "";
  result.value = "";
}

// 复制
const copy_text = ref();
const copy = () => {
  const text1 = result.value;
  if (text1.trim() === "") return;
  copy_text.value.setAttribute("data-clipboard-text", text1);
  initCopyClipboard();
  copy_text.value.click();
};

// 设置复制板
const initCopyClipboard = () => {
  const clipboard = new Clipboard(".clipboard_text");
  clipboard.on("success", function (e) {
    showToast("复制成功");
    // 清空选中
    clipboard.destroy();
  });
  clipboard.on("error", function (e) {
    showToast("复制失败");
    // 清空选中
    clipboard.destroy();
  });
};
</script>

<style scoped lang="less">
.van-dropdown-menu {
  width: 100%;
}

.van-cell-group {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

<style scoped lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .clipboard_text {
    position: fixed;
    top: -500px;
    left: 0;
    width: 200px;
    height: 200px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .result {
    color: black;
    font-size: 14px;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    padding: 5px;
    margin: 10px;
    flex: 1;
    overflow-y: scroll;
  }

  .btnWrapper {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    align-items: center;
    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      margin-left: 10px;
      border-radius: 5px;
      background: #126cfe;
      color: #fff;
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

    .reset {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      border-radius: 5px;
      background: #dfa634;
      color: #fff;
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
  }
}
</style>
