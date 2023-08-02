<template>
  <div class="data-tab">1223</div>
</template>

<script setup>
import { ElDialog } from "element-plus";

const { showClose, closeOnClickModal, visible } = defineProps({
  showClose: {
    default: false,
    type: Boolean,
    description: "是否显示关闭按钮",
  },
  closeOnClickModal: {
    default: false,
    type: Boolean,
    description: "点击遮罩层是否关闭弹窗",
  },
  visible: {
    default: false,
    type: Boolean,
    description: "打开/关闭",
  },
});
console.log("props", showClose, closeOnClickModal, visible);

const emit = defineEmits(["close"]);
</script>

<style lang="less">
.data-tab {
}
</style>