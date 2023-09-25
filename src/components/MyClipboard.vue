<template>
  <div
    ref="copy_text"
    class="clipboard_text"
    data-clipboard-action="copy"
    data-clipboard-text="copytext"
  ></div>
</template>
<!--  复制文字的组件 -->
<script setup>
import { ref } from "vue";
import Clipboard from "clipboard";

const emit = defineEmits(["success", "fail"]);
const copy_text = ref();

const copy = (text) => {
  copy_text.value.setAttribute("data-clipboard-text", text);
  initCopyClipboard();
  copy_text.value.click();
};

// 设置复制板
const initCopyClipboard = () => {
  const clipboard = new Clipboard(".clipboard_text");
  clipboard.on("success", function (e) {
    emit("success");
    // 清空选中
    clipboard.destroy();
  });
  clipboard.on("error", function (e) {
    emit("fail");
    // 清空选中
    clipboard.destroy();
  });
};

// 暴露
defineExpose({
  copy, // 复制文字时调用这个方法
});
</script>

<style scoped lang="less">
.clipboard_text {
  position: fixed;
  top: -500px;
  left: 0;
  width: 200px;
  height: 200px;
}
</style>