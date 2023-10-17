<template>
  <div class="container">
    <div class="form">
      <van-dropdown-menu v-if="columns.length > 0">
        <van-dropdown-item v-model="selectResult" :disabled="columns.length <= 1" :options="columns" />
      </van-dropdown-menu>

      <van-cell-group inset>
        <van-field v-model="message" rows="5" autosize type="textarea" maxlength="500" placeholder="请输入您的问题"
          show-word-limit />
      </van-cell-group>
      <div class="btnWrapper">
        <div :class="['reset', columns.length <= 1 ? 'largeBtn' : '']" @click="reset">重置</div>
        <voice-input-button v-if="columns.length > 1" appId="57fe6cc5" apiKey="0bf1bd1b6e154aea50622ef5bf4257c6"
          apiSecret="MTI4MjVjNmQxMjBkYTZiZjI3N2U5MjBi" @record="showResult" @record-start="recordStart"
          @record-stop="recordStop" @record-blank="recordNoResult" @record-failed="recordFailed"
          @record-ready="recordReady" @record-complete="recordComplete" interactiveMode="press" tipPosition="top">
          <template slot="no-speak">没听清您说的什么</template>
        </voice-input-button>
        <!-- <voice-output-button :message="result" @speaker-start="isSpeaking = true" v-if="columns.length > 1"
          @speaker-end="isSpeaking = false"></voice-output-button> -->
        <div :class="['submit', columns.length <= 1 ? 'largeBtn' : '']" @click="answer"
          v-html="columns.length <= 1 ? '提问' : '手动<br>提问'"></div>
      </div>
    </div>

    <div class=" result" @click="copy">{{ result }}</div>
    <div ref="copy_text" class="clipboard_text" data-clipboard-action="copy" data-clipboard-text="copytext"></div>
    <div class="floatPerson" v-if="columns.length > 1">
      <Person :message="result"></Person>
      <!-- <anim_listen v-if="isListening"></anim_listen>
      <anim_speak v-else-if="isSpeaking"></anim_speak>
      <anim_normal v-else></anim_normal> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import request from "@/http/index";
import { useRouter } from "vue-router";
import voiceInputButton from "./input/voice-input-button.vue";
import voiceOutputButton from "./tts/tts.vue";
import Person from "./person_xf.vue";

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
import { reactive } from "vue";
const selectResult = ref("");
const message = ref("");
const columns = reactive([
  // { text: "憨猴", value: "/qa/hanhou" },
  // { text: "流浪地球", value: "/qa/lldq" },
  // { text: "中山", value: "/qa/zhongshan" },
  // { text: "龙铭鹤", value: "/qa/lmh" },
]);

const isListening = ref(false);
const isSpeaking = ref(false);
const result = ref("");
const router = useRouter();

const name = router.currentRoute.value.name;
if (name === 'hsQA') {
  document.title = '憨猴·AI'
  columns.push({ text: "憨猴", value: "/qa/hanhou" });
  selectResult.value = "/qa/hanhou";
} else if (name === 'lldqQA') {
  document.title = '流浪地球·AI'
  columns.push({ text: "流浪地球", value: "/qa/lldq" });
  selectResult.value = "/qa/lldq";
} else if (name === 'zsQA') {
  document.title = '中山·AI'
  columns.push({ text: "中山", value: "/qa/zhongshan" });
  selectResult.value = "/qa/zhongshan";
} else if (name === 'lmhQA') {
  document.title = '龙铭鹤·AI'
  columns.push({ text: "龙铭鹤", value: "/qa/lmh" });
  selectResult.value = "/qa/lmh";
} else if (name === 'isrQA') {
  document.title = 'ISR-AI'
  columns.push({ text: "ISR-AI", value: "/qa/isr" });
  selectResult.value = "/qa/isr";
} else {
  document.title = '憨猴·AI'
  columns.push({ text: "憨猴", value: "/qa/hanhou" });
  columns.push({ text: "流浪地球", value: "/qa/lldq" });
  columns.push({ text: "中山", value: "/qa/zhongshan" });
  columns.push({ text: "龙铭鹤", value: "/qa/lmh" });
  selectResult.value = "/qa/hanhou";
}
console.log(router.currentRoute.value.name, name, columns, 'yk3372');

function answer() {
  showLoadingToast({
    duration: 0,
    message: "处理中...",
    forbidClick: true,
  });
  const query = encodeURIComponent(message.value.replace(/[\r\n]+/g, ""));
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
  isListening.value = true;
}
function showResult(text) {
  message.value = text;
  console.info("收到识别结果：", text);
}
function recordStop() {
  console.info("录音结束");
  isListening.value = false;
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
  isListening.value = false;
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

/deep/.van-dropdown-menu__item--disabled .van-dropdown-menu__title {
  color: black !important;
  &::after {
    border-color: transparent !important;
  }
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

  .floatPerson {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }

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

    .largeBtn {
      width: 120px;
      height: 60px;
    }
  }
}
</style>
