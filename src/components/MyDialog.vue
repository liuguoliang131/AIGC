<template>
  <div class="mydialog">
    <el-dialog
      align-center
      v-model="visible"
      width="3.1777rem"
      :show-close="showClose"
      :close-on-click-modal="closeOnClickModal"
      @close="dialogClose"
      class="_dia"
    >
      <slot></slot>
    </el-dialog>
  </div>
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

const dialogClose = () => {
  emit("close", visible);
};
</script>

<style lang="less">
.mydialog {
  .el-dialog {
    border-radius: 16px;
  }
  .el-dialog__header {
    padding: 0;
  }

  ._dia {
    border-radius: 16px;
    .el-dialog__headerbtn {
      width: 60px;
      height: 60px;
    }
    .el-dialog__close {
      font-size: 30.5px;
    }
  }
  .el-dialog__body {
    padding: 37px 33px;
  }
}
</style>