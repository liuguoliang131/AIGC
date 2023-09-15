<template>
  <div class="container">
    <div class="form">
      <van-dropdown-menu>
        <van-dropdown-item v-model="selectResult" :options="columns" />
      </van-dropdown-menu>

      <van-cell-group inset>
        <van-field v-model="message" rows="5" autosize type="textarea" maxlength="500" placeholder="请输入您的问题"
          show-word-limit />
      </van-cell-group>
      <div class="submit" @click="answer">回答</div>
    </div>

    <div class="result" @click="copy">{{ result }}</div>
    <div ref="copy_text" class="clipboard_text" data-clipboard-action="copy" data-clipboard-text="copytext"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import request from "@/http/index";
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
const message = ref('');
const showPicker = ref(false);
const columns = [
  { text: "憨猴", value: "/qa/hanhou" },
  { text: "流浪地球", value: "/qa/lldq" },
  { text: "中山", value: "/qa/zhongshan" },
];

const onConfirm = ({ selectedOptions }) => {
  selectResult.value = selectedOptions[0]?.value;
  showPicker.value = false;
};

const result = ref("");

function answer() {
  showLoadingToast({
    duration: 0,
    message: "处理中...",
    forbidClick: true,
  });
  const query = encodeURIComponent(message.value);
  request.get(`/user/hanhouqa?question=${selectResult.value}/${query}`).then((res) => {
    closeToast();
    if (res.code == 200) {
      result.value = res.data;
    } else {
      showToast(res.msg || res.message);
    }
  }).catch(() => {
    closeToast();
  });
}

// 复制
const copy_text = ref();
const copy = () => {
  const text1 = result.value;
  if (text1.trim() === '') return;
  copy_text.value.setAttribute("data-clipboard-text", text1);
  initCopyClipboard();
  copy_text.value.click();
};

// 设置复制板
const initCopyClipboard = () => {
  const clipboard = new Clipboard(".clipboard_text");
  clipboard.on("success", function (e) {
    showToast('复制成功');
    // 清空选中
    clipboard.destroy();
  });
  clipboard.on("error", function (e) {
    showToast('复制失败');
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

  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 40px;
    margin-top: 20px;
    flex-shrink: 0;
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
</style>
