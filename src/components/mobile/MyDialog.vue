<template>
  <van-overlay :show="props.show" @click="handHide">
    <div class="dialog_mask">
      <div class="dialog_center" @click.stop>
        <div class="title">{{ props.title }}</div>
        <div class="message">{{ props.message }}</div>
        <div class="btns">
          <div
            :class="[
              'cancel',
              props.showConfirmButton === false ? 'full_size' : '',
            ]"
            v-if="props.showCancelButton"
            @click="cancel"
          >
            {{ props.cancelButtonText }}
          </div>
          <div
            :class="[
              'confirm',
              props.showCancelButton === false ? 'full_size' : '',
            ]"
            v-if="props.showConfirmButton"
            @click="confirm"
          >
            {{ props.confirmButtonText }}
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { Overlay as VanOverlay } from "vant";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
    discription: "是否展示确认按钮",
  },
  showCancelButton: {
    type: Boolean,
    default: false,
    discription: "是否展示取消按钮",
  },
  confirmButtonText: {
    type: String,
    default: "确定",
    discription: "确定按钮文案",
  },
  cancelButtonText: {
    type: String,
    default: "取消",
    discription: "取消按钮文案",
  },
});
const emit = defineEmits(["update:show", "cancel", "confirm"]);

const handHide = () => {
  if (!props.closeOnClickOverlay) return;
  emit("update:show", false);
};

const cancel = () => {
  emit("update:show", false);
  emit("cancel");
};
const confirm = () => {
  emit("update:show", false);
  emit("confirm");
};
</script>

<style scoped lang="less">
.dialog_mask {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.dialog_center {
  box-sizing: border-box;
  width: 299px;
  min-height: 164px;
  padding: 20px 16px;
  background-color: #fff;
  border-radius: 8px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 11px;
    color: #333;
    text-align: center;
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 25px;
  }
  .message {
    min-height: 37px;
    color: #333;
    text-align: center;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 11px;
    .cancel {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 129px;
      height: 40px;
      flex-shrink: 0;
      background-color: #126cfe;
      color: #fff;
      text-align: center;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      border-radius: 5px;
      &:active {
        opacity: 0.7;
      }
    }
    .confirm {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 129px;
      height: 40px;
      border: 1px solid #126cfe;
      flex-shrink: 0;
      box-sizing: border-box;
      color: #126cfe;
      background-color: #fff;
      text-align: center;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      border-radius: 5px;
      &:active {
        opacity: 0.7;
      }
    }
    .full_size {
      width: 100%;
      background-color: #126cfe;
      color: #fff;
    }
  }
}
</style>