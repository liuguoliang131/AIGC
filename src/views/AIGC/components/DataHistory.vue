<template>
  <div class="data-tab">
    <div class="title">历史绘画</div>
    <div class="views">
      <!-- <div class="empty">
        <div class="text">暂无记录</div>
      </div> -->
      <div class="scroll_client">
        <div class="scroll_page">卷轴</div>
      </div>
    </div>
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
</script>

<style scoped lang="less">
.data-tab {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 39px;
    border-bottom: 1px solid #e6e6e6;
    text-align: left;
    text-indent: 20px;
    color: #414141;
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .views {
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #999;
      text-align: center;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;
      .text {
        transform: translate(0, -100px);
      }
    }

    .scroll_client {
      height: 100%;
      overflow-y: scroll;
      .scroll_page {
      }
    }
  }
}
</style>