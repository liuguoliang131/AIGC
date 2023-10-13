<template>
  <div class="container">
    <van-dropdown-menu v-if="columns.length > 0">
      <van-dropdown-item v-model="selectResult" :disabled="columns.length <= 1" :options="columns" />
    </van-dropdown-menu>
    <div class="floatPerson" v-if="columns.length > 1">
      <Person :message="result"></Person>
    </div>
    <div class="chatHistoryWrapper" v-if="list.length > 0">
      <div class="chatHistory" ref="chatScrollView">
        <template v-for="(item, index) in list" :key="index">
          <div :class="['chatMsgItem']">
            <span :class="[(item['type'] === 'sender' || item['type'] === 'senderTmp') ? 'senderName' : 'aiName']">{{
              senderName(item)
            }}</span>
            <span v-html="item['content']" />
          </div>
        </template>
      </div>
    </div>
    <div class="form">
      <div class="input_control">
        <div class="input_switch" @click="changeInput">
          <img v-if="isVoiceInput" src="@/assets/jianpan.svg" alt="" class="input_switch_icon" />
          <img v-else src="@/assets/yuyin.svg" alt="" class="input_switch_icon" />
        </div>
        <div class="input_wrapper">
          <div class="text_input_wrapper" v-if="!isVoiceInput">
            <van-field v-model="message" rows="1" center autosize type="textarea" maxlength="500" placeholder="请输入您的问题"
              class="text_input" />
            <div :class="['submit', columns.length <= 1 ? 'largeBtn' : '']" @click="textAnswer"
              v-html="columns.length <= 1 ? '提问' : '手动<br>提问'"></div>
          </div>
          <voice-input-button v-if="isVoiceInput" appId="57fe6cc5" apiKey="0bf1bd1b6e154aea50622ef5bf4257c6"
            apiSecret="MTI4MjVjNmQxMjBkYTZiZjI3N2U5MjBi" @record="showResult" @record-start="recordStart"
            @record-stop="recordStop" @record-blank="recordNoResult" @record-failed="recordFailed"
            @record-ready="recordReady" @record-complete="recordComplete" interactiveMode="press" tipPosition="top">
            <template slot="no-speak">没听清您说的什么</template>
          </voice-input-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";
import { List as VanList } from "vant";
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
const isVoiceInput = ref(true);
const list = ref([]);
const chatScrollView = ref();
const columns = reactive([
  // { text: "憨猴", value: "/qa/hanhou" },
  // { text: "流浪地球", value: "/qa/lldq" },
  // { text: "中山", value: "/qa/zhongshan" },
  // { text: "龙铭鹤", value: "/qa/lmh" },
]);
const interfaceMap = {
  "/qa/hanhou": { text: "憨猴", value: "/qa/hanhou" },
  "/qa/lldq": { text: "流浪地球", value: "/qa/lldq" },
  "/qa/zhongshan": { text: "中山", value: "/qa/zhongshan" },
  "/qa/lmh": { text: "龙铭鹤", value: "/qa/lmh" },
};

const isListening = ref(false);
const isSpeaking = ref(false);
const result = ref("");
const router = useRouter();

const name = router.currentRoute.value.name;
if (name === 'hsQA') {
  document.title = '憨猴·AI';
  selectResult.value = "/qa/hanhou";
  columns.push(interfaceMap[selectResult.value]);
} else if (name === 'lldqQA') {
  document.title = '流浪地球·AI';
  selectResult.value = "/qa/lldq";
  columns.push(interfaceMap[selectResult.value]);
} else if (name === 'zsQA') {
  document.title = '中山·AI';
  selectResult.value = "/qa/zhongshan";
  columns.push(interfaceMap[selectResult.value]);
} else if (name === 'lmhQA') {
  document.title = '龙铭鹤·AI';
  selectResult.value = "/qa/lmh";
  columns.push(interfaceMap[selectResult.value]);
} else {
  document.title = '憨猴·AI';
  columns.push(interfaceMap["/qa/hanhou"]);
  columns.push(interfaceMap["/qa/lldq"]);
  columns.push(interfaceMap["/qa/zhongshan"]);
  columns.push(interfaceMap["/qa/lmh"]);
  selectResult.value = "/qa/hanhou";
}
console.log(router.currentRoute.value.name, name, columns, 'yk3372');

watch(selectResult, (newValue, oldValue) => {
  console.log(newValue, oldValue);
  if (newValue !== oldValue) {
    list.value = [];
  }
});

function senderName(item) {
  return (item['type'] === 'sender' || item['type'] === 'senderTmp')
    ? ('游客: ')
    : (interfaceMap[selectResult.value]['text'] + '数字人: ');
}
function changeInput() {
  isVoiceInput.value = !isVoiceInput.value;
}

function scrollToEndDirectly() {
  nextTick(() => {
    chatScrollView.value.scrollTop = (chatScrollView.value.offsetHeight);
  });
}

function textAnswer() {
  const content = message.value.trim();
  list.value.push({ 'type': 'sender', 'content': content });
  scrollToEndDirectly();
  answer();
}
function answer() {
  showLoadingToast({
    duration: 0,
    message: "处理中...",
    forbidClick: true,
  });
  const content = message.value.trim();
  message.value = '';
  const query = encodeURIComponent(content);
  request
    .get(`/user/hanhouqa?question=${selectResult.value}/${query}`)
    .then((res) => {
      closeToast();
      if (res.code == 200) {
        result.value = res.data;
        list.value.push({ 'type': 'ai', 'content': result.value });
        scrollToEndDirectly();
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
  const listTmp = list.value;
  const item = listTmp[listTmp.length - 1];
  if (item['type'] === 'senderTmp') {
    list.value.pop();
  }
  list.value.push({ 'type': 'senderTmp', 'content': text });
  scrollToEndDirectly();
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
  const listTmp = list.value;
  const item = listTmp[listTmp.length - 1];
  if (item['type'] === 'senderTmp') {
    list.value.pop();
  }
  if (text && text.length > 0) {
    message.value = text;
    const content = message.value;
    list.value.push({ 'type': 'sender', 'content': content });
    scrollToEndDirectly();
    answer();
  }
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
  /deep/.van-popup {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
    /deep/.van-cell {
    background-color:  transparent !important;
  }
}

/deep/.van-dropdown-menu__bar {
  background-color: transparent !important;
}

/deep/.van-dropdown-menu__item--disabled .van-dropdown-menu__title {
  color: black !important;

  &::after {
    border-color: transparent !important;
  }
}

// /deep/.van-cell:after {
//   display: none;
//   // height: 50px !important;
// }

.van-cell-group {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.form {
  /deep/.van-cell {
    padding: 0px !important;
    background-color: transparent !important;
  }
}
</style>

<style scoped lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: url("https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_person_bg.jpg");
    background-size: cover;
    background-color: #e6e4e4;

  .chatHistoryWrapper {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px 0;
    position: absolute;
    bottom: 60px;
    left: 0;
    z-index: 2;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: calc(100% - 10px);

    .chatHistory {
      position: relative;

      padding: 0px 10px;
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 180px;
      // min-height: 180px;

      .chatMsgItem {
        color: rgba(0, 0, 0, 0.8);
        font-size: 12px;
        margin-top: 4px;
        width: 100%;
        overflow-wrap: break-word;

        .senderName {
          color: green;
        }

        .aiName {
          color: blue;
        }
      }
    }
  }

  .floatPerson {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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

    .input_control {
      display: flex;
      border-top: .5px solid rgb(181, 178, 178);
      padding: 5px 5px;
      flex-direction: row;
      width: 100%;
      height: 50px;
      align-items: center;

      .input_switch {
        width: 35px;
        height: 35px;
        margin-left: 5px;
        margin-right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius: 40px;


        .input_switch_icon {
          width: 25px;
          height: 25px;
        }
      }

      .input_wrapper {
        flex: 1;
        margin-right: 5px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: start;

        .text_input_wrapper {
          display: flex;
          flex-direction: row;
          flex: 1;
          height: 50px;

          .text_input {
            flex: 1;
            background-color: #f2f1f1 !important;
            border-radius: 10px;
            padding-left: 5px !important;

            /deep/textarea {
              height: 24px !important;
            }
          }

          .submit {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            flex-shrink: 0;
            margin-left: 5px;
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
        }
      }
    }
  }

  .result {
    position: relative;
    color: grey;
    font-size: 14px;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    padding: 5px;
    margin: 10px;
    flex: 1;
    height: 375px;
    overflow-y: scroll;
  }

  .btnWrapper {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;


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
