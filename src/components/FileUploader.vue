<template>
  <div v-loading="loading" class="file_upload">
    <input type="file" id="file" />
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { value } = defineProps({
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

const loading = ref(false);

const dialogClose = () => {
  emit("close", visible);
};
</script>

<style scoped lang="less">
.file_upload {
  display: inline-block;
  #file {
    position: fixed;
    top: -1000px;
    left: 0;
    width: 0;
  }
}
</style>